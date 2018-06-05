package com.faiyt.pennywise.configuration;

import com.faiyt.pennywise.models.Address;
import com.faiyt.pennywise.models.State;
import com.faiyt.pennywise.models.finance.*;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.models.user.UserProfile;
import com.faiyt.pennywise.services.AddressService;
import com.faiyt.pennywise.services.BillService;
import com.faiyt.pennywise.services.IncomeService;
import com.faiyt.pennywise.services.user.UserService;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAmount;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class DataLoader implements ApplicationRunner {

    // will delete data and refresh test data
    // probably can move to app props
    private static final boolean FRESHSTART = false;

    private UserService userDao;
    private BillService billDao;
    private AddressService addressDao;
    private IncomeService incomeDao;
    private PasswordEncoder passwordEncoder;

    private List<BillCategory> categories ;
    private List<PayFrequency> frequencies;
    private List<PaymentMethod> methods;


    @Autowired
    public DataLoader(UserService userDao, BillService billDao, PasswordEncoder passwordEncoder,
                      AddressService addressDao, IncomeService incomeDao) {
        this.userDao = userDao;
        this.billDao = billDao;
        this.addressDao = addressDao;
        this.incomeDao = incomeDao;
        this.passwordEncoder = passwordEncoder;

       this.categories = billDao.getBills().getCategories();
       this.frequencies = billDao.getBills().getPayFrequencies();
       this.methods = billDao.getBills().getPaymentMethods();
    }


    public void run(ApplicationArguments args) {
        if (FRESHSTART) {
            Faker faker = new Faker();
            // Deletes existing records
            cleanDB();

            //How many users
            Integer usersToCreate = 10;
            Integer avgBillsPerUser = 12;
            Integer maxIncomesPerUser = 3;
            String testUserName = "test";
            String testPassword = "test";

            // Store user Id's

            Integer totalBills = avgBillsPerUser * usersToCreate;

            List<Bill> bills = new ArrayList<>();

            List<String> interestTypes = new ArrayList<>();
            interestTypes.add("None");
            interestTypes.add("Compound");
            interestTypes.add("Standard");

            for (int i = 0; i < usersToCreate; i++) {
                User user = createUser(testUserName + i, testPassword);

                // Creates fake Bills
                for (int j = 0; j < avgBillsPerUser; j++) {
                    Random rand = new Random();
                    LocalDateTime createdAt = LocalDateTime.now();
                    LocalDate dueDate = LocalDate.now().minusDays(5).plusDays(rand.nextInt(20));
                    Double interestRate = 0.15;
                    Double payment = ThreadLocalRandom.current().nextDouble(10, 600);
                    String interestType = interestTypes.get(rand.nextInt(interestTypes.size()));
                    PaymentMethod method = methods.get(rand.nextInt(methods.size()));

                    //Merchant
                    Merchant merchant = createRandomMerchant();

                    BillCategory randomCat = categories.get(rand.nextInt(categories.size()));
                    PayFrequency frequency = frequencies.get(rand.nextInt(frequencies.size()));


                    if (!frequency.getName().equalsIgnoreCase("One-Time")) {

                        RecurringBill bill = new RecurringBill(faker.rickAndMorty().location(), createdAt, dueDate, interestRate,
                                interestType, randomCat, merchant, method, user);

                        bill.setPayment(payment);
                        bill.setFrequency(frequency);
                        bill.generateDueDatesList();

                        billDao.getBills().save(bill);

                    } else {

                        OneTimeBill bill = new OneTimeBill(faker.zelda().game(), createdAt, dueDate, interestRate,
                                interestType, randomCat, merchant, method, user);

                        bill.setPayment(payment);
                        billDao.getBills().save(bill);
                    }


                }


                // Income Generation
                for(int j = 0; j < maxIncomesPerUser; j++) {

                    Random r = new Random();

                    // Randomly adds income or not.
                    if (r.nextBoolean()) {

                        Income income = createIncome(user);
                        incomeDao.getIncomes().save(income);

                    }


                }

            }


        } //END FRESH START
    }

    private Merchant createRandomMerchant() {
        Faker faker = new Faker();
        Random rand = new Random();

        List<State> states = addressDao.getAddresses().getStates();

        State state = states.get(rand.nextInt(states.size()));

        Address address =  new Address( faker.app().name(),  faker.address().streetAddress(),
                faker.address().cityName(),  state,  faker.address().zipCode());

      return new Merchant( faker.app().name(),  faker.internet().domainName(),
                faker.name().username(),  faker.phoneNumber().phoneNumber(),
                        address);

    }


   private User createUser(String username, String password) {

        // delete if exists...old test data.
       Faker faker = new Faker();

        User user = new User(username, password, LocalDateTime.now(), LocalDateTime.now());
        String hash = passwordEncoder.encode(password);
        user.setPassword(hash);
        user.setCreatedAt(LocalDateTime.now());

        user.setProfile(new UserProfile(faker.name().fullName(),  faker.name().firstName(),
                faker.name().lastName(),  faker.internet().emailAddress(), faker.name().username()));
        user = userDao.getUsers().save(user);
               userDao.getUsers().addDefaultRole(user.getId());

        return user;
    }



    private Income createIncome(User user) {
        // delete if exists...old test data.
        Faker faker = new Faker();
        Random rand = new Random();

        PayFrequency frequency = frequencies.get(rand.nextInt(frequencies.size()));
        Double payment = ThreadLocalRandom.current().nextDouble(1500, 6000);

        return new Income(faker.app().name(),  frequency,  payment, user);

    }



    private void cleanDB() {
        billDao.getBills().deleteAll();
        userDao.getUsers().deleteAll();
    }


}
