package com.faiyt.pennywise.configuration;

import com.faiyt.pennywise.models.Address;
import com.faiyt.pennywise.models.State;
import com.faiyt.pennywise.models.finance.*;
import com.faiyt.pennywise.models.user.User;
import com.faiyt.pennywise.services.AddressService;
import com.faiyt.pennywise.services.BillService;
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

@Component
public class DataLoader implements ApplicationRunner {

    UserService userDao;
    BillService billDao;
    AddressService addressDao;
    PasswordEncoder passwordEncoder;

    @Autowired
    public DataLoader(UserService userDao, BillService billDao, PasswordEncoder passwordEncoder, AddressService addressDao) {
        this.userDao = userDao;
        this.billDao = billDao;
        this.addressDao = addressDao;
        this.passwordEncoder = passwordEncoder;

    }


    public void run(ApplicationArguments args) {

        //How many users
        Integer usersToCreate = 10;
        Integer avgBillsPerUser = 12;
        String  testUserName = "test";
        String  testPassword = "test";

        // Store user Id's

        Integer totalBills = avgBillsPerUser * usersToCreate;

        List<Bill> bills = new ArrayList<>();
        List<BillCategory> categories = billDao.getBills().getCategories();
        List<PayFrequency> frequencies = billDao.getBills().getPayFrequencies();

        List<String> interestTypes = new ArrayList<>();
                interestTypes.add("None");
                interestTypes.add("Compound");
                interestTypes.add("Standard");

        for(int i = 0; i < usersToCreate; i++) {
           User user = createUser(testUserName + i, testPassword);
            for(int j = 0; j < avgBillsPerUser; j++ ) {
                Random rand = new Random();

                LocalDateTime createdAt = LocalDateTime.now();
                LocalDate dueDate = LocalDate.now().minusDays(5).plusDays(rand.nextInt(20));
                Double interestRate = 0.15;
                String interestType = interestTypes.get(rand.nextInt(interestTypes.size()));;

                Merchant merchant = createRandomMerchant();
                BillCategory randomCat = categories.get(rand.nextInt(categories.size()));

                Faker faker = new Faker();

                PayFrequency frequency = frequencies.get(rand.nextInt(frequencies.size()));


                if(!frequency.getName().equalsIgnoreCase("One-Time")) {

                    RecurringBill bill = new RecurringBill(faker.zelda().game(), createdAt, dueDate, interestRate,
                            interestType, randomCat, merchant, user);

                    bill.setFrequency(frequency);
                    bill.generateDueDatesList();

                    billDao.getBills().save(bill);

                } else {

                    OneTimeBill bill = new OneTimeBill(faker.zelda().game(), createdAt, dueDate, interestRate,
                            interestType, randomCat, merchant, user);

                    billDao.getBills().save(bill);
                }



                }

        }

    }



    private Merchant createRandomMerchant() {
        Faker faker = new Faker();
        Random rand = new Random();

        List<State> states = addressDao.getAddresses().getStates();

        State state = states.get(rand.nextInt(states.size()));;

        Address address =  new Address( faker.app().name(),  faker.address().streetAddress(),
                faker.address().cityName(),  state,  faker.address().zipCode());

      return new Merchant( faker.app().name(),  faker.commerce().productName(),
                faker.name().username(),  faker.phoneNumber().phoneNumber(),
                        address);

    }


   private User createUser(String username, String password) {
        User user = new User(username, password, LocalDateTime.now(), LocalDateTime.now());

        String hash = passwordEncoder.encode(password);
        user.setPassword(hash);
        user.setCreatedAt(LocalDateTime.now());

        user = userDao.getUsers().save(user);
               userDao.getUsers().addDefaultRole(user.getId());

        return user;
    }
}
