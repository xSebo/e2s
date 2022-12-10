using WebApplication2.Extensions;
using WebApplication2.Models;

namespace WebApplication2.Services; 

public class WeeklyMailingService : IHostedService {
    private readonly IServiceScopeFactory _scopeFactory;
    private Timer _timer;
    
    public WeeklyMailingService(IServiceScopeFactory scopeFactory) {
        _scopeFactory = scopeFactory;
    }

    public Task StartAsync(CancellationToken cancellationToken) {
        // https://stacksecrets.com/dot-net-core/scheduled-repeating-task-with-net-core @ 10/12/2022
        
        // Time between each email being sent
        TimeSpan emailInterval = TimeSpan.FromDays(7);

        // Calculating when to send each email (i.e. Start on 7AM Monday)
        var nextEmailTime = DateTime.Now.StartOfWeek(DayOfWeek.Monday).Add(TimeSpan.FromHours(8));
        var firstEmailInterval = nextEmailTime.Subtract(DateTime.Now);

        Action action = () => {
            var task1 = Task.Delay(firstEmailInterval);
            task1.Wait();
            // Sending the first email then creating a timer for the next
            SendInsightsEmail(null);
            _timer = new Timer(
                SendInsightsEmail,
                null,
                TimeSpan.Zero, 
                emailInterval
            );
        };
        
        Task.Run(action);
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken) {
        return Task.CompletedTask;
    }

    private void SendInsightsEmail(Object state) {
        using (var scope = _scopeFactory.CreateScope()) {
            var mailService = scope.ServiceProvider.GetRequiredService<IMailService>();
            mailService.SendInsights();
        }
    }
}