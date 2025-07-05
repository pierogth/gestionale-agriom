import React, { useEffect, useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import PieChart from './PieChart';
import BarChart from './BarChart';
import BarChart4Retailes from './BarChart4Retailes';

import Button from '@material-tailwind/react/components/Button';
import { Input } from '@material-tailwind/react';
import { router } from '@inertiajs/core';
import axios from 'axios';
const data = [
    {
      "id": "haskell",
      "label": "haskell",
      "value": 10,
      "color": "hsl(17, 70%, 50%)"
    },
    {
      "id": "lisp",
      "label": "lisp",
      "value": 10,
      "color": "hsl(177, 70%, 50%)"
    },
    {
      "id": "go",
      "label": "go",
      "value": 30,
      "color": "hsl(244, 70%, 50%)"
    },
    {
      "id": "python",
      "label": "python",
      "value": 25,
      "color": "hsl(135, 70%, 50%)"
    },
    {
      "id": "hack",
      "label": "hack",
      "value": 25,
      "color": "hsl(26, 70%, 50%)"
    }
  ];

  const data2 = [
    {
      "id": "haskell",
      "label": "haskell",
      "value": 5,
      "color": "hsl(17, 70%, 50%)"
    },
    {
      "id": "lisp",
      "label": "lisp",
      "value": 10,
      "color": "hsl(177, 70%, 50%)"
    },
    {
      "id": "go",
      "label": "go",
      "value": 35,
      "color": "hsl(244, 70%, 50%)"
    },
    {
      "id": "python",
      "label": "python",
      "value": 20,
      "color": "hsl(135, 70%, 50%)"
    },
    {
      "id": "hack",
      "label": "hack",
      "value": 15,
      "color": "hsl(26, 70%, 50%)"
    },
    {
      "id": "hackintosh",
      "label": "hackintosh",
      "value": 15,
      "color": "hsl(263, 70%, 50%)"
    }
  ];

  const dataBarChart = [
    {
      "mese": "Gennaio",
      "privati": 125,
      "privatiColor": "hsl(297, 70%, 50%)",
      "ecommerce": 97,
      "ecommerceColor": "hsl(21, 70%, 50%)",
      "rivenditori": 91,
      "rivenditoriColor": "hsl(269, 70%, 50%)",
      // "kebab": 70,
      // "kebabColor": "hsl(338, 70%, 50%)",
      // "fries": 73,
      // "friesColor": "hsl(82, 70%, 50%)",
      // "donut": 70,
      // "donutColor": "hsl(221, 70%, 50%)"
    },
    {
      "mese": "Febbraio",
      "privati": 125,
      "privatiColor": "hsl(297, 70%, 50%)",
      "ecommerce": 97,
      "ecommerceColor": "hsl(21, 70%, 50%)",
      "rivenditori": 91,
      "rivenditoriColor": "hsl(269, 70%, 50%)",
      // "kebab": 70,
      // "kebabColor": "hsl(338, 70%, 50%)",
      // "fries": 73,
      // "friesColor": "hsl(82, 70%, 50%)",
      // "donut": 70,
      // "donutColor": "hsl(221, 70%, 50%)"
    },
    {
      "mese": "Marzo",
      "privati": 125,
      "privatiColor": "hsl(297, 70%, 50%)",
      "ecommerce": 97,
      "ecommerceColor": "hsl(21, 70%, 50%)",
      "rivenditori": 91,
      "rivenditoriColor": "hsl(269, 70%, 50%)",
      // "kebab": 70,
      // "kebabColor": "hsl(338, 70%, 50%)",
      // "fries": 73,
      // "friesColor": "hsl(82, 70%, 50%)",
      // "donut": 70,
      // "donutColor": "hsl(221, 70%, 50%)"
    },
    {
      "mese": "Aprile",
      "privati": 125,
      "privatiColor": "hsl(297, 70%, 50%)",
      "ecommerce": 97,
      "ecommerceColor": "hsl(21, 70%, 50%)",
      "rivenditori": 91,
      "rivenditoriColor": "hsl(269, 70%, 50%)",
      // "kebab": 70,
      // "kebabColor": "hsl(338, 70%, 50%)",
      // "fries": 73,
      // "friesColor": "hsl(82, 70%, 50%)",
      // "donut": 70,
      // "donutColor": "hsl(221, 70%, 50%)"
    },
    {
      "mese": "Maggio",
      "privati": 125,
      "privatiColor": "hsl(297, 70%, 50%)",
      "ecommerce": 97,
      "ecommerceColor": "hsl(21, 70%, 50%)",
      "rivenditori": 91,
      "rivenditoriColor": "hsl(269, 70%, 50%)",
      // "kebab": 70,
      // "kebabColor": "hsl(338, 70%, 50%)",
      // "fries": 73,
      // "friesColor": "hsl(82, 70%, 50%)",
      // "donut": 70,
      // "donutColor": "hsl(221, 70%, 50%)"
    },
    {
      "mese": "Giugno",
      "privati": 125,
      "privatiColor": "hsl(297, 70%, 50%)",
      "ecommerce": 97,
      "ecommerceColor": "hsl(21, 70%, 50%)",
      "rivenditori": 91,
      "rivenditoriColor": "hsl(269, 70%, 50%)",
      // "kebab": 70,
      // "kebabColor": "hsl(338, 70%, 50%)",
      // "fries": 73,
      // "friesColor": "hsl(82, 70%, 50%)",
      // "donut": 70,
      // "donutColor": "hsl(221, 70%, 50%)"
    },
    {
      "mese": "Luglio",
      "privati": 125,
      "privatiColor": "hsl(297, 70%, 50%)",
      "ecommerce": 97,
      "ecommerceColor": "hsl(21, 70%, 50%)",
      "rivenditori": 91,
      "rivenditoriColor": "hsl(269, 70%, 50%)",
      // "kebab": 70,
      // "kebabColor": "hsl(338, 70%, 50%)",
      // "fries": 73,
      // "friesColor": "hsl(82, 70%, 50%)",
      // "donut": 70,
      // "donutColor": "hsl(221, 70%, 50%)"
    },
    {
      "mese": "Agosto",
      "privati": 125,
      "privatiColor": "hsl(297, 70%, 50%)",
      "ecommerce": 97,
      "ecommerceColor": "hsl(21, 70%, 50%)",
      "rivenditori": 91,
      "rivenditoriColor": "hsl(269, 70%, 50%)",
      // "kebab": 70,
      // "kebabColor": "hsl(338, 70%, 50%)",
      // "fries": 73,
      // "friesColor": "hsl(82, 70%, 50%)",
      // "donut": 70,
      // "donutColor": "hsl(221, 70%, 50%)"
    },
    {
      "mese": "Settembre",
      "privati": 125,
      "privatiColor": "hsl(297, 70%, 50%)",
      "ecommerce": 97,
      "ecommerceColor": "hsl(21, 70%, 50%)",
      "rivenditori": 91,
      "rivenditoriColor": "hsl(269, 70%, 50%)",
      // "kebab": 70,
      // "kebabColor": "hsl(338, 70%, 50%)",
      // "fries": 73,
      // "friesColor": "hsl(82, 70%, 50%)",
      // "donut": 70,
      // "donutColor": "hsl(221, 70%, 50%)"
    },
    {
      "mese": "Ottobre",
      "privati": 125,
      "privatiColor": "hsl(297, 70%, 50%)",
      "ecommerce": 97,
      "ecommerceColor": "hsl(21, 70%, 50%)",
      "rivenditori": 91,
      "rivenditoriColor": "hsl(269, 70%, 50%)",
      // "kebab": 70,
      // "kebabColor": "hsl(338, 70%, 50%)",
      // "fries": 73,
      // "friesColor": "hsl(82, 70%, 50%)",
      // "donut": 70,
      // "donutColor": "hsl(221, 70%, 50%)"
    },
    {
      "mese": "Novembre",
      "privati": 125,
      "privatiColor": "hsl(297, 70%, 50%)",
      "ecommerce": 97,
      "ecommerceColor": "hsl(21, 70%, 50%)",
      "rivenditori": 91,
      "rivenditoriColor": "hsl(269, 70%, 50%)",
      // "kebab": 70,
      // "kebabColor": "hsl(338, 70%, 50%)",
      // "fries": 73,
      // "friesColor": "hsl(82, 70%, 50%)",
      // "donut": 70,
      // "donutColor": "hsl(221, 70%, 50%)"
    },
    {
      "mese": "Dicembre",
      "privati": 125,
      "privatiColor": "hsl(297, 70%, 50%)",
      "ecommerce": 97,
      "ecommerceColor": "hsl(21, 70%, 50%)",
      "rivenditori": 91,
      "rivenditoriColor": "hsl(269, 70%, 50%)",
      // "kebab": 70,
      // "kebabColor": "hsl(338, 70%, 50%)",
      // "fries": 73,
      // "friesColor": "hsl(82, 70%, 50%)",
      // "donut": 70,
      // "donutColor": "hsl(221, 70%, 50%)"
    },
  ];
const BalanceView: React.FC = ({dataToBar, dataToPie, dataRetailersBar}) => {

    const [dataChange, setDataChange] = useState(data);
    const [flag, setFlag] = useState(false);

    const [inOutView, setInOutView] = useState(true);
    const [landView, setLandView] = useState(false);
    const [entriesView, setEntriesView] = useState(false);
    const [dateInizio, setDateInizio] = useState('');
    const [dateFine, setDateFine] = useState('');
    const [dataBar, setDataBar] = useState(dataToBar);
    const [dataPie, setDataPie] = useState([]);
    const [myFlag4AnimatedPie, setMyFlag4AnimatedPie] = useState(false);


    useEffect(()=>{
      setTimeout(function(){
        setDataPie(dataToPie)
    }, 300);
        
        console.log("ciao da ue!")

    }, [myFlag4AnimatedPie]);

    const handleSubmit = (event) => {

      event.preventDefault();
  
      //router.get('/api/entrate-uscite',{'start':dateInizio,'end':dateFine})
      axios.get('/api/entrate-uscite', {params: {'start':dateInizio,'end':dateFine} }).then(res => {
        console.log(res.data)
        setDataBar(res.data)
     })
  
    }

  return (
    <AppLayout
      title="Bilancio"
      renderHeader={() => ( <div className='text-center'>

        <Button onClick={()=>{setInOutView(true);setLandView(false);setEntriesView(false);setDataPie([])}} className="bg-sky-200 hover:bg-sky-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2">entrate</Button>

        <Button onClick={()=>{setLandView(true);setInOutView(false);setEntriesView(false);setMyFlag4AnimatedPie(!myFlag4AnimatedPie)}} className="bg-sky-200 hover:bg-sky-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2">spese</Button>

        <Button onClick={()=>{setEntriesView(true);setInOutView(false);setLandView(false);setDataPie([])}} className="bg-sky-200 hover:bg-sky-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">saldo rivenditori</Button>
          
      </div>
      )}
    >
    
    {landView ? <> <div style={{"height":"460px", "width":"100%"}}><PieChart data={dataPie} title={"SPESE"}></PieChart></div></> : inOutView ? 
                              <>
                                  <div className='text-center text-white p-0 m-0' ><b>{"ENTRATE"}</b></div>

                             <form onSubmit={handleSubmit} className="flex p-3" style={{alignContent: "center", textAlign: "center", justifyContent: "center"}}>

                             <div className="mr-4">
                       
                               <label htmlFor="dateInizio" className="block text-white font-bold mb-2">Data inizio:</label>
                       
                               <Input type="date" id="dateInizio" value={dateInizio} onChange={(e) => setDateInizio(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                       
                             </div>
                       
                             <div>
                       
                               <label htmlFor="dateFine" className="block text-white font-bold mb-2">Data fine:</label>
                       
                               <Input type="date" id="dateFine" value={dateFine} onChange={(e) => setDateFine(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                       
                             </div>
                       
                             <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">Aggiorna grafici</Button>
                       
                           </form>
                           {/*<div className="flex">*/}
                           <div style={{"height":"360px", "width":"100%", paddingLeft:"10%", paddingRight:"10%"}}>
                            <BarChart data={dataBar} title={"ENTRATE"} ></BarChart></div>
                            {/*<div style={{"height":"360px", "width":"50%"}}>
                            <BarChart data={dataBar} title={"USCITE"} legend={false}></BarChart></div>{/*</div>*/}
                            </>
                            : entriesView ? <div style={{"height":"480px", "width":"100%", paddingLeft:"10%", paddingRight:"5%"}}>
                            <BarChart4Retailes data={dataRetailersBar} title={"SALDO RIVENDITORI"} legend={false}></BarChart4Retailes></div>
                            : ""}




    

    </AppLayout>
  );
};

export default BalanceView;