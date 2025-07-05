<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Entry;
use App\Models\Shop;
use App\Models\Retailer;

use DateTime;


class BalanceController extends Controller
{
    public function index()
  {
    $types = [0 => 'e-commerce', 1 => 'privati', 2 => 'rivenditori'];
    
  
    $mesi = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
    $dataToGraph = [];
    
      $data_min = new DateTime("2024-01-01");
      $data_max = new DateTime("2024-08-08");
      //Reservation::whereBetween('reservation_from', [$from, $to])->get();
      $entries = Entry::whereBetween('data',[$data_min, $data_max])->get()->toArray();
      $year_min = $data_min->format('Y');
      $year_max = $data_max->format('Y');
      $start_month = $data_min->format('m');
      $finish_month = $data_max->format('m');
      for($year=$year_min; $year<$year_max+1; $year++){
        if($year==$year_max){
          for($month=1; $month<=$finish_month; $month++){
            $sumECommerce = 0;
            $sumPrivati = 0;
            $sumRivenditori = 0;
            
            $date = new DateTime("$year-$month-01");
  
            $firstDayOfMonth = $date->format('Y-m-d');
            $date->modify('last day of this month');
            $last_day_this_month = $date->format('Y-m-d');
            // Define the minimum and maximum dates
            $min_date = strtotime($firstDayOfMonth);
            $max_date = strtotime($last_day_this_month);
      
            foreach($entries as $entry){
              $check_date = strtotime($entry['data']);
              if ($check_date >= $min_date && $check_date <= $max_date) {
                  //appartiene al mese
                  if($entry['type']==0){
                    $sumECommerce += $entry['quantity'];
                  }elseif($entry['type']==1){
                    $sumPrivati += $entry['quantity'];
                  }elseif($entry['type']==2){
                    $sumRivenditori += $entry['quantity'];
                  }
                  //$dataToGraph[$i]=$entry;
              } else {
                 //do nothing...
              }
            }
            array_push($dataToGraph, ["mese"=>$month.' - '.$year, "privati"=> $sumPrivati,
                  "privatiColor"=> "hsl(297, 70%, 50%)",
                  "ecommerce"=>$sumECommerce,
                  "ecommerceColor"=>"hsl(21, 70%, 50%)",
                  "rivenditori"=>$sumRivenditori,
                  "rivenditoriColor"=>"hsl(269, 70%, 50%)"]);
          }
        }elseif($year==$year_min){
          for($month=$start_month; $month<=12; $month++){
            $sumECommerce = 0;
            $sumPrivati = 0;
            $sumRivenditori = 0;
            
            $date = new DateTime("$year-$month-01");
  
            $firstDayOfMonth = $date->format('Y-m-d');
            $date->modify('last day of this month');
            $last_day_this_month = $date->format('Y-m-d');
            // Define the minimum and maximum dates
            $min_date = strtotime($firstDayOfMonth);
            $max_date = strtotime($last_day_this_month);
      
            foreach($entries as $entry){
              $check_date = strtotime($entry['data']);
              if ($check_date >= $min_date && $check_date <= $max_date) {
                  //appartiene al mese
                  if($entry['type']==0){
                    $sumECommerce += $entry['quantity'];
                  }elseif($entry['type']==1){
                    $sumPrivati += $entry['quantity'];
                  }elseif($entry['type']==2){
                    $sumRivenditori += $entry['quantity'];
                  }
                  //$dataToGraph[$i]=$entry;
              } else {
                 //do nothing...
              }
            }
            array_push($dataToGraph, ["mese"=>$month.' - '.$year, "privati"=>$sumPrivati,
                  "privatiColor"=>"hsl(297, 70%, 50%)",
                  "ecommerce"=>$sumECommerce,
                  "ecommerceColor"=>"hsl(21, 70%, 50%)",
                  "rivenditori"=>$sumRivenditori,
                  "rivenditoriColor"=>"hsl(269, 70%, 50%)",]);
          }
    }else{
      for($month=1; $month<=12; $month++){
        $sumECommerce = 0;
            $sumPrivati = 0;
            $sumRivenditori = 0;
            
            $date = new DateTime("$year-$month-01");
  
            $firstDayOfMonth = $date->format('Y-m-d');
            $date->modify('last day of this month');
            $last_day_this_month = $date->format('Y-m-d');
            // Define the minimum and maximum dates
            $min_date = strtotime($firstDayOfMonth);
            $max_date = strtotime($last_day_this_month);
      
            foreach($entries as $entry){
              $check_date = strtotime($entry['data']);
              if ($check_date >= $min_date && $check_date <= $max_date) {
                  //appartiene al mese
                  if($entry['type']==0){
                    $sumECommerce += $entry['quantity'];
                  }elseif($entry['type']==1){
                    $sumPrivati += $entry['quantity'];
                  }elseif($entry['type']==2){
                    $sumRivenditori += $entry['quantity'];
                  }
                  //$dataToGraph[$i]=$entry;
              } else {
                 //do nothing...
              }
            }
            array_push($dataToGraph, [
                  "mese"=>$month.' - '.$year,
                  "privati"=>$sumPrivati,
                  "privatiColor"=>"hsl(297, 70%, 50%)",
                  "ecommerce"=>$sumECommerce,
                  "ecommerceColor"=>"hsl(21, 70%, 50%)",
                  "rivenditori"=>$sumRivenditori,
                  "rivenditoriColor"=>"hsl(269, 70%, 50%)"
                ]);
      }
    }}
    //dd($dataToGraph);
    $retailers = Retailer::all()->toArray();
    $dataRetailersBar = [];
    foreach($retailers as $retailer){
      $retailer['balance']<0 ?
      array_push($dataRetailersBar, [
        "mese"=>$retailer['name'],
        "debito"=>$retailer['balance'],
        //"debitoColor"=>"lightred",
      ])
      :
      array_push($dataRetailersBar, [
        "mese"=>$retailer['name'],
        "credito"=>$retailer['balance'],
       // "creditoColor"=>"lightred",
      ]);
    }
   // dd($dataRetailersBar);
    $shops=Shop::all()->groupBy('type')->toArray();
    //dd($shops);
    $dataToPie = [];
    foreach($shops as $key => $shop){
      
      $amount=0;
      foreach($shop as $toSum){
        $amount += $toSum['amount'];
      }
      array_push($dataToPie, ['id'=>$shop[0]['type'],"label"=>$shop[0]["type"],
      "value"=>$amount,
      "color"=>$this->getRandomColor()]);
    }
    //dd($dataToPie);
    return Inertia::render('Balance/Index', ["dataToBar"=>$dataToGraph, "dataToPie"=>$dataToPie, "dataRetailersBar"=>$dataRetailersBar]);
  
}

public function getRandomColor() {

  $red = rand(0, 255);

  $green = rand(0, 255);

  $blue = rand(0, 255);

  return "rgb({$red}, {$green}, {$blue})";

}

public function giveMeTheData(Request $request){

//dd($request->start);
$dataToGraph = [];
    
$data_min = new DateTime($request->start);
$data_max = new DateTime($request->end);
//Reservation::whereBetween('reservation_from', [$from, $to])->get();
$entries = Entry::whereBetween('data',[$data_min, $data_max])->get()->toArray();
$year_min = $data_min->format('Y');
$year_max = $data_max->format('Y');
$start_month = $data_min->format('m');
$finish_month = $data_max->format('m');
for($year=$year_min; $year<$year_max+1; $year++){
  if($year==$year_max && $year_min!=$year_max){
    for($month=1; $month<=$finish_month; $month++){
      $sumECommerce = 0;
      $sumPrivati = 0;
      $sumRivenditori = 0;
      
      $date = new DateTime("$year-$month-01");

      $firstDayOfMonth = $date->format('Y-m-d');
      $date->modify('last day of this month');
      $last_day_this_month = $date->format('Y-m-d');
      // Define the minimum and maximum dates
      $min_date = strtotime($firstDayOfMonth);
      $max_date = strtotime($last_day_this_month);

      foreach($entries as $entry){
        $check_date = strtotime($entry['data']);
        if ($check_date >= $min_date && $check_date <= $max_date) {
            //appartiene al mese
            if($entry['type']==0){
              $sumECommerce += $entry['quantity'];
            }elseif($entry['type']==1){
              $sumPrivati += $entry['quantity'];
            }elseif($entry['type']==2){
              $sumRivenditori += $entry['quantity'];
            }
            //$dataToGraph[$i]=$entry;
        } else {
           //do nothing...
        }
      }
      array_push($dataToGraph, ["mese"=>$month.' - '.$year, "privati"=> $sumPrivati,
            "privatiColor"=> "hsl(297, 70%, 50%)",
            "ecommerce"=>$sumECommerce,
            "ecommerceColor"=>"hsl(21, 70%, 50%)",
            "rivenditori"=>$sumRivenditori,
            "rivenditoriColor"=>"hsl(269, 70%, 50%)"]);
    }
  }elseif($year==$year_min){
    for($month=$start_month; $month<=$finish_month; $month++){
      $sumECommerce = 0;
      $sumPrivati = 0;
      $sumRivenditori = 0;
      
      $date = new DateTime("$year-$month-01");

      $firstDayOfMonth = $date->format('Y-m-d');
      $date->modify('last day of this month');
      $last_day_this_month = $date->format('Y-m-d');
      // Define the minimum and maximum dates
      $min_date = strtotime($firstDayOfMonth);
      $max_date = strtotime($last_day_this_month);

      foreach($entries as $entry){
        $check_date = strtotime($entry['data']);
        if ($check_date >= $min_date && $check_date <= $max_date) {
            //appartiene al mese
            if($entry['type']==0){
              $sumECommerce += $entry['quantity'];
            }elseif($entry['type']==1){
              $sumPrivati += $entry['quantity'];
            }elseif($entry['type']==2){
              $sumRivenditori += $entry['quantity'];
            }
            //$dataToGraph[$i]=$entry;
        } else {
           //do nothing...
        }
      }
      array_push($dataToGraph, ["mese"=>$month.' - '.$year, "privati"=>$sumPrivati,
            "privatiColor"=>"hsl(297, 70%, 50%)",
            "ecommerce"=>$sumECommerce,
            "ecommerceColor"=>"hsl(21, 70%, 50%)",
            "rivenditori"=>$sumRivenditori,
            "rivenditoriColor"=>"hsl(269, 70%, 50%)",]);
    }
}else{
for($month=1; $month<=12; $month++){
  $sumECommerce = 0;
      $sumPrivati = 0;
      $sumRivenditori = 0;
      
      $date = new DateTime("$year-$month-01");

      $firstDayOfMonth = $date->format('Y-m-d');
      $date->modify('last day of this month');
      $last_day_this_month = $date->format('Y-m-d');
      // Define the minimum and maximum dates
      $min_date = strtotime($firstDayOfMonth);
      $max_date = strtotime($last_day_this_month);

      foreach($entries as $entry){
        $check_date = strtotime($entry['data']);
        if ($check_date >= $min_date && $check_date <= $max_date) {
            //appartiene al mese
            if($entry['type']==0){
              $sumECommerce += $entry['quantity'];
            }elseif($entry['type']==1){
              $sumPrivati += $entry['quantity'];
            }elseif($entry['type']==2){
              $sumRivenditori += $entry['quantity'];
            }
            //$dataToGraph[$i]=$entry;
        } else {
           //do nothing...
        }
      }
      array_push($dataToGraph, ["mese"=>$month.' - '.$year, "privati"=>$sumPrivati,
            "privatiColor"=>"hsl(297, 70%, 50%)",
            "ecommerce"=>$sumECommerce,
            "ecommerceColor"=>"hsl(21, 70%, 50%)",
            "rivenditori"=>$sumRivenditori,
            "rivenditoriColor"=>"hsl(269, 70%, 50%)",]);
}
}}
//dd($dataToGraph);
return $dataToGraph;







}
}
