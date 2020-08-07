<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class encuesta extends Model
{
    protected $primaryKey ='id_encuesta';

    protected $table = 'encuesta';

    protected $fillable = ['agregarlealinforme','escorrecta','1a5','user_id'];
}
