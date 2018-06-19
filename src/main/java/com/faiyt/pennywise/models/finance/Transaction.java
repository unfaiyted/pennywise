package com.faiyt.pennywise.models.finance;


import com.plaid.client.response.TransactionsGetResponse;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String accountId;
    @Column
    private Double amount;
    @Column
    private String isoCurrencyCode;
    @Column
    private String unofficialCurrencyCode;

    @ElementCollection
    @CollectionTable(name="transaction_category", joinColumns=@JoinColumn(name="transaction_id"))
    @Column(name="category")
    private List<String> category;
    @Column
    private String categoryId;
    @Column
    private String date;
    @OneToOne(cascade = CascadeType.ALL)
    private Transaction.Location location;
    @Column
    private String name;
    @Column
    private String originalDescription;
    @OneToOne(cascade = CascadeType.ALL)
    private Transaction.PaymentMeta paymentMeta;
    @Column
    private Boolean pending;
    @Column
    private String pendingTransactionId;
    @Column
    private String transactionId;
    @Column
    private String transactionType;
    @Column
    private String accountOwner;

    public Transaction() {}

    public Transaction(String accountId, Double amount, String isoCurrencyCode, String unofficialCurrencyCode, List<String> category, String categoryId, String date, Location location, String name, String originalDescription, PaymentMeta paymentMeta, Boolean pending, String pendingTransactionId, String transactionId, String transactionType, String accountOwner) {
        this.accountId = accountId;
        this.amount = amount;
        this.isoCurrencyCode = isoCurrencyCode;
        this.unofficialCurrencyCode = unofficialCurrencyCode;
        this.category = category;
        this.categoryId = categoryId;
        this.date = date;
        this.location = location;
        this.name = name;
        this.originalDescription = originalDescription;
        this.paymentMeta = paymentMeta;
        this.pending = pending;
        this.pendingTransactionId = pendingTransactionId;
        this.transactionId = transactionId;
        this.transactionType = transactionType;
        this.accountOwner = accountOwner;
    }

    public Transaction(com.plaid.client.response.TransactionsGetResponse.Transaction transaction) {
        this.accountId = transaction.getAccountId();
        this.amount = transaction.getAmount();
        this.isoCurrencyCode = transaction.getIsoCurrencyCode();
        this.unofficialCurrencyCode = transaction.getUnofficialCurrencyCode();
        this.category = transaction.getCategory();
        this.categoryId = transaction.getCategoryId();
        this.date = transaction.getDate();
        this.location = new Location(transaction.getLocation());
        this.name = transaction.getName();
        this.originalDescription = transaction.getOriginalDescription();
        this.paymentMeta = new PaymentMeta(transaction.getPaymentMeta());
        this.pending = transaction.getPending();
        this.pendingTransactionId = transaction.getPendingTransactionId();
        this.transactionId = transaction.getTransactionId();
        this.transactionType = transaction.getTransactionType();
        this.accountOwner = transaction.getAccountOwner();

    }

    @Entity
    @Table
    public static final class Location {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        @Column  private String address;
        @Column  private String city;
        @Column private String state;
        @Column private String zip;
        @Column private Double lat;
        @Column private Double lon;
        @Column private String storeNumber;

        public Location() {
        }

        public Location(com.plaid.client.response.TransactionsGetResponse.Transaction.Location l) {
            this.address = l.getAddress();
            this.city = l.getCity();
            this.state = l.getState();
            this.zip = l.getZip();
            this.lat = l.getLat();
            this.lon = l.getLon();
            this.storeNumber = l.getStoreNumber();
        }

        public Location(String address, String city, String state, String zip, Double lat, Double lon, String storeNumber) {
            this.address = address;
            this.city = city;
            this.state = state;
            this.zip = zip;
            this.lat = lat;
            this.lon = lon;
            this.storeNumber = storeNumber;
        }

        public String getAddress() {
            return address;
        }


        public void setAddress(String address) {
            this.address = address;
        }

        public String getCity() {
            return city;
        }

        public void setCity(String city) {
            this.city = city;
        }

        public String getState() {
            return state;
        }

        public void setState(String state) {
            this.state = state;
        }

        public String getZip() {
            return zip;
        }

        public void setZip(String zip) {
            this.zip = zip;
        }

        public Double getLat() {
            return lat;
        }

        public void setLat(Double lat) {
            this.lat = lat;
        }

        public Double getLon() {
            return lon;
        }

        public void setLon(Double lon) {
            this.lon = lon;
        }

        public String getStoreNumber() {
            return storeNumber;
        }

        public void setStoreNumber(String storeNumber) {
            this.storeNumber = storeNumber;
        }
    }


    @Entity
    @Table
    public static final class PaymentMeta {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        @Column
        private String byOrderOf;
        @Column
        private String payee;
        @Column
        private String payer;
        @Column private String paymentMethod;
        @Column private String paymentProcessor;
        @Column private String ppdId;
        @Column private String reason;
        @Column private String referenceNumber;

        public PaymentMeta() {
        }

        public PaymentMeta(com.plaid.client.response.TransactionsGetResponse.Transaction.PaymentMeta p) {
            this.byOrderOf = p.getByOrderOf();
            this.payee = p.getPayee();
            this.payer = p.getPayer();
            this.paymentMethod = p.getPaymentMethod();
            this.paymentProcessor = p.getPaymentProcessor();
            this.ppdId = p.getPpdId();
            this.reason = p.getReason();
            this.referenceNumber = p.getReferenceNumber();
        }

        public PaymentMeta(String byOrderOf, String payee, String payer, String paymentMethod, String paymentProcessor, String ppdId, String reason, String referenceNumber) {
            this.byOrderOf = byOrderOf;
            this.payee = payee;
            this.payer = payer;
            this.paymentMethod = paymentMethod;
            this.paymentProcessor = paymentProcessor;
            this.ppdId = ppdId;
            this.reason = reason;
            this.referenceNumber = referenceNumber;
        }

        public String getByOrderOf() {
            return byOrderOf;
        }

        public void setByOrderOf(String byOrderOf) {
            this.byOrderOf = byOrderOf;
        }

        public String getPayee() {
            return payee;
        }

        public void setPayee(String payee) {
            this.payee = payee;
        }

        public String getPayer() {
            return payer;
        }

        public void setPayer(String payer) {
            this.payer = payer;
        }

        public String getPaymentMethod() {
            return paymentMethod;
        }

        public void setPaymentMethod(String paymentMethod) {
            this.paymentMethod = paymentMethod;
        }

        public String getPaymentProcessor() {
            return paymentProcessor;
        }

        public void setPaymentProcessor(String paymentProcessor) {
            this.paymentProcessor = paymentProcessor;
        }

        public String getPpdId() {
            return ppdId;
        }

        public void setPpdId(String ppdId) {
            this.ppdId = ppdId;
        }

        public String getReason() {
            return reason;
        }

        public void setReason(String reason) {
            this.reason = reason;
        }

        public String getReferenceNumber() {
            return referenceNumber;
        }

        public void setReferenceNumber(String referenceNumber) {
            this.referenceNumber = referenceNumber;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getIsoCurrencyCode() {
        return isoCurrencyCode;
    }

    public void setIsoCurrencyCode(String isoCurrencyCode) {
        this.isoCurrencyCode = isoCurrencyCode;
    }

    public String getUnofficialCurrencyCode() {
        return unofficialCurrencyCode;
    }

    public void setUnofficialCurrencyCode(String unofficialCurrencyCode) {
        this.unofficialCurrencyCode = unofficialCurrencyCode;
    }

    public List<String> getCategory() {
        return category;
    }

    public void setCategory(List<String> category) {
        this.category = category;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOriginalDescription() {
        return originalDescription;
    }

    public void setOriginalDescription(String originalDescription) {
        this.originalDescription = originalDescription;
    }

    public PaymentMeta getPaymentMeta() {
        return paymentMeta;
    }

    public void setPaymentMeta(PaymentMeta paymentMeta) {
        this.paymentMeta = paymentMeta;
    }

    public Boolean getPending() {
        return pending;
    }

    public void setPending(Boolean pending) {
        this.pending = pending;
    }

    public String getPendingTransactionId() {
        return pendingTransactionId;
    }

    public void setPendingTransactionId(String pendingTransactionId) {
        this.pendingTransactionId = pendingTransactionId;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public String getAccountOwner() {
        return accountOwner;
    }

    public void setAccountOwner(String accountOwner) {
        this.accountOwner = accountOwner;
    }
}
