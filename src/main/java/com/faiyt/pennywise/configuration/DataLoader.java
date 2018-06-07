package com.faiyt.pennywise.configuration;

import com.faiyt.pennywise.models.Address;
import com.faiyt.pennywise.models.CalendarEvent;
import com.faiyt.pennywise.models.notification.*;
import com.faiyt.pennywise.models.State;
import com.faiyt.pennywise.models.finance.*;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.models.user.UserProfile;
import com.faiyt.pennywise.services.AddressService;
import com.faiyt.pennywise.services.BillService;
import com.faiyt.pennywise.services.IncomeService;
import com.faiyt.pennywise.services.NotificationService;
import com.faiyt.pennywise.services.user.UserService;
import com.github.javafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class DataLoader implements ApplicationRunner {

    // will delete data and refresh test data
    // probably can move to app props or something...

    // SET TRUE: Resets the user data tables and create false data
    // THIS DOES NOT CHANGE THE BASE TABLES
    private static final boolean FRESHSTART = false;

    // THIS CLEARS STUFF! EVERYTHING REFRESH!
    private static final boolean REFRESHBASE = false;

    private UserService userDao;
    private BillService billDao;
    private AddressService addressDao;
    private IncomeService incomeDao;
    private NotificationService notificationDao;
    private PasswordEncoder passwordEncoder;

    private List<BillCategory> categories ;
    private List<PayFrequency> frequencies;
    private List<PaymentMethod> methods;
    private List<NotificationType>  notificationTypes;

    private List<String> interestTypes = new ArrayList<>();

    private Faker faker = new Faker();
    private Random rand = new Random();

    @Autowired
    public DataLoader(UserService userDao, BillService billDao, PasswordEncoder passwordEncoder,
                      AddressService addressDao, IncomeService incomeDao, NotificationService notificationDao) {
        this.userDao = userDao;
        this.billDao = billDao;
        this.addressDao = addressDao;
        this.incomeDao = incomeDao;
        this.notificationDao = notificationDao;
        this.passwordEncoder = passwordEncoder;

       this.categories = billDao.getBills().getCategories();
       this.frequencies = billDao.getBills().getPayFrequencies();
       this.methods = billDao.getBills().getPaymentMethods();
       this.notificationTypes = notificationDao.getNotifications().getTypes();


        this.interestTypes.add("None");
        this.interestTypes.add("Compound");
        this.interestTypes.add("Standard");
    }


    public void run(ApplicationArguments args) {
        if (FRESHSTART) {
            Random r = new Random();

            // Deletes existing records
            cleanDB();

            //How many users
            Integer usersToCreate = 10;
            Integer avgBillsPerUser = 12;
            Integer maxIncomesPerUser = 3;
            Integer maxNotificationsPerUser = 15;

            String testUserName = "test";
            String testPassword = "test";

            // Store user Id's

            Integer totalBills = avgBillsPerUser * usersToCreate;

            List<Bill> bills = new ArrayList<>();


            // START DATA GENERATION (USERS)
            for (int i = 0; i < usersToCreate; i++) {
                User user = createUser(testUserName + i, testPassword);

                Integer notificationsCreated = 0;

                // START BILL GENERATION
                for (int j = 0; j < avgBillsPerUser; j++) {
                    Bill bill = createBill(user);
                    billDao.getBills().save(bill);

                    if (r.nextBoolean()) {
                        Notification notification = createNotification(user, bill);
                        notificationDao.getNotifications().save(notification);
                        notificationsCreated++;
                    }

                }

                // START INCOME GENERATION
                for(int j = 0; j < maxIncomesPerUser; j++) {

                    // Randomly adds income or not.
                    if (r.nextBoolean()) {
                        Income income = createIncome(user);
                        incomeDao.getIncomes().save(income);

                        if (r.nextBoolean()) {
                            Notification notification = createNotification(user, income);
                            notificationDao.getNotifications().save(notification);
                            notificationsCreated++;
                        }


                    }


                } // END INCOME GENERATION

                // START NOTIFICATION GENERATION
                for(int j = notificationsCreated; j < maxNotificationsPerUser; j++) {

                    // Randomly adds income or not.
                    if (r.nextBoolean()) {
                        Notification notification = createNotification(user, faker.gameOfThrones().quote());
                        notificationDao.getNotifications().save(notification);

                    }


                } // END NOTIFICATION GENERATION



            }


        } //END FRESH START
    }

    private Bill createBill(User user) {
        Faker faker = new Faker();

        Random rand = new Random();
        LocalDateTime createdAt = LocalDateTime.now();
        LocalDate dueDate = LocalDate.now().minusDays(5).plusDays(rand.nextInt(20));
        Double interestRate = 0.15;
        Double payment = ThreadLocalRandom.current().nextDouble(10, 600);
        Double totalOwed = payment * (ThreadLocalRandom.current().nextDouble(4, 60));
        String interestType = interestTypes.get(rand.nextInt(interestTypes.size()));
        PaymentMethod method = methods.get(rand.nextInt(methods.size()));

        //Merchant
        Merchant merchant = createRandomMerchant();

        BillCategory randomCat = categories.get(rand.nextInt(categories.size()));
        PayFrequency frequency = frequencies.get(rand.nextInt(frequencies.size()));


        if (!frequency.getName().equalsIgnoreCase("One-Time")) {

            RecurringBill bill = new RecurringBill(faker.rickAndMorty().location(), createdAt, dueDate, interestRate,
                    interestType, randomCat, merchant, method, user);


            bill.setTotalOwed(totalOwed);
            bill.setPayment(payment);
            bill.setFrequency(frequency);
            bill.generateDueDatesList();

            return bill;
        }


        OneTimeBill bill = new OneTimeBill(faker.zelda().game(), createdAt, dueDate, interestRate,
                    interestType, randomCat, merchant, method, user);

        bill.setPayment(payment);
        return bill;


    }

    private Merchant createRandomMerchant() {
        Faker faker = new Faker();
        Random rand = new Random();

        List<State> states = addressDao.getAddresses().getStates();

        State state = states.get(rand.nextInt(states.size()));

        Address address =  new Address( faker.app().name(),  faker.address().streetAddress(),
                faker.address().cityName(),  state,  faker.address().zipCode());

      return new Merchant( faker.app().name(),  "http://"+ faker.internet().domainName(),
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



    private Notification createNotification(User user, Bill bill) {
        NotificationType  type = notificationTypes.get(rand.nextInt(notificationTypes.size()));

        Notification notification = new BillNotification(faker.commerce().productName(),
                faker.rickAndMorty().quote(), type, user, bill);

        notification.setCreatedAt(LocalDateTime.now().minusHours(rand.nextInt(130)));

        return notification;

    }

    private Notification createNotification(User user, Income income) {
        NotificationType  type = notificationTypes.get(rand.nextInt(notificationTypes.size()));

        Notification notification = new IncomeNotification(faker.commerce().productName(),
                faker.rickAndMorty().quote(), type, user, income);

        notification.setCreatedAt(LocalDateTime.now().minusHours(rand.nextInt(130)));

        return notification;

    }

    private Notification createNotification(User user, String systemMessage) {
        NotificationType  type = notificationTypes.get(rand.nextInt(notificationTypes.size()));

        Notification notification = new SystemNotification(faker.commerce().productName(),
                faker.rickAndMorty().quote(), type, user, systemMessage);

        notification.setCreatedAt(LocalDateTime.now().minusHours(rand.nextInt(130)));

        return notification;

    }

    private Notification createNotification(User user, CalendarEvent event) {
        NotificationType  type = notificationTypes.get(rand.nextInt(notificationTypes.size()));

        Notification notification = new CalendarNotification(faker.commerce().productName(),
                faker.rickAndMorty().quote(), type, user, event);

        notification.setCreatedAt(LocalDateTime.now().minusHours(rand.nextInt(130)));

        return notification;
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
