<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    // relation with company
    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    protected $fillable = [
        'first_name',
        'last_name',
        'company_id',
        'email',
        'phone'

    ];
}
