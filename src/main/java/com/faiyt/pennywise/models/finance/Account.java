package com.faiyt.pennywise.models.finance;


import javax.persistence.*;

@Table
@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String accountId;
    @Column
    private String type;
    @Column
    private String subtype;
    @OneToOne(cascade = CascadeType.ALL)
    private Account.Balances balances;
    @Column
    private String name;
    @Column
    private String mask;
    @Column
    private String officialName;

    public Account() {
    }
    public Account(String accountId, String type, String subtype, Balances balances, String name, String mask, String officialName) {
        this.accountId = accountId;
        this.type = type;
        this.subtype = subtype;
        this.balances = balances;
        this.name = name;
        this.mask = mask;
        this.officialName = officialName;
    }

    /* Plaid Account data */
    public Account(com.plaid.client.response.Account a) {
        this.accountId = a.getAccountId();
        this.type = a.getType();
        this.subtype = a.getSubtype();
        this.balances = new Account.Balances(a.getBalances());
        this.name = a.getName();
        this.mask = a.getMask();
        this.officialName = a.getOfficialName();
    }

    public String getAccountId() {
        return this.accountId;
    }

    public String getType() {
        return this.type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setSubtype(String subtype) {
        this.subtype = subtype;
    }

    public void setBalances(Balances balances) {
        this.balances = balances;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMask(String mask) {
        this.mask = mask;
    }

    public void setOfficialName(String officialName) {
        this.officialName = officialName;
    }

    public String getSubtype() {
        return this.subtype;
    }

    public Account.Balances getBalances() {
        return this.balances;
    }

    public String getName() {
        return this.name;
    }

    public String getMask() {
        return this.mask;
    }

    public String getOfficialName() {
        return this.officialName;
    }

    @Table
    @Entity
    public static final class Balances {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        @Column
        private Double available;
        @Column
        private Double current;
        @Column(name="bal_limit")
        private Double limit;
        @Column
        private String isoCurrencyCode;
        @Column
        private String unofficialCurrencyCode;

        public Balances() {
        }

        public Balances(com.plaid.client.response.Account.Balances b) {
            this.available = b.getAvailable();
            this.current = b.getCurrent();
            this.limit = b.getLimit();
            this.isoCurrencyCode = b.getIsoCurrencyCode();
            this.unofficialCurrencyCode = b.getUnofficialCurrencyCode();
        }

        public Balances(Double available, Double current, Double limit, String isoCurrencyCode, String unofficialCurrencyCode) {
            this.available = available;
            this.current = current;
            this.limit = limit;
            this.isoCurrencyCode = isoCurrencyCode;
            this.unofficialCurrencyCode = unofficialCurrencyCode;
        }

        public Double getAvailable() {
            return this.available;
        }

        public Double getCurrent() {
            return this.current;
        }

        public Double getLimit() {
            return this.limit;
        }

        public String getIsoCurrencyCode() {
            return this.isoCurrencyCode;
        }

        public String getUnofficialCurrencyCode() {
            return this.unofficialCurrencyCode;
        }
    }


}
