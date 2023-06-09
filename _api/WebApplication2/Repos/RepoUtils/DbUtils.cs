﻿using WebApplication2.Data;

namespace WebApplication2.Repos;

public class DbUtils : IDbUtils{
    private readonly E2SContext _e2sContext;

    public DbUtils(E2SContext e2sContext){
        _e2sContext = e2sContext;
    }
    
    public void SaveChanges(){
        _e2sContext.SaveChanges();
    }

    public void SaveChangesAsync(){
        _e2sContext.SaveChangesAsync();
    }
}