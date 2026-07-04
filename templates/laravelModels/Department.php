<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $table = 'departments';

    protected $fillable = [
        'name',
        'code',
        'company_id',
        'description',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
