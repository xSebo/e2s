namespace WebApplication2.Extensions; 

public static class DateTimeExtensions {
    
    // https://stackoverflow.com/questions/38039/how-can-i-get-the-datetime-for-the-start-of-the-week @ 10/12/2022
    public static DateTime StartOfWeek(this DateTime dt, DayOfWeek startOfWeek) {
        int diff = (7 + (dt.DayOfWeek - startOfWeek)) % 7;
        return dt.AddDays(-1 * diff).Date;
    }
}