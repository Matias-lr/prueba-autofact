<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\encuesta;

class encuestaController extends Controller
{
    public function getEncuestas(Request $request){
        return encuesta::all();
    }
    public function postEncuesta(Request $request){
        encuesta::create([
            'agregarlealinforme' => $request['add'],
            'escorrecta' => $request['escorrecta'],
            '1a5' => $request['1a5'],
            'user_id' => $request['user_id']
        ]);
        return response('register complete',200);
    }
}
