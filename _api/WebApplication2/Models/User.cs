﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication2.Models;

public class User{
    [Key]
    public int Id{ get; set; }
    public string? Name{ get; set; } = null!;
    public string? Password{ get; set; }
    public string? Email{ get; set; }

    public int? AuthorityId{ get; set; }
    public virtual Authority Authority{ get; set; }
    

}