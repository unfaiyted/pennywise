package com.faiyt.pennywise.models.user;

/* Used t store the Jackson view implementations
 * https://spring.io/blog/2014/12/02/latest-jackson-integration-improvements-in-spring
 * In case I forget....
 * */
public class View {

    public interface  Summary {}
    public interface  SummaryWithDetails extends Summary {}

}
