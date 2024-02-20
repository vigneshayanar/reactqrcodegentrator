import { useState } from "react"

function Qrcode(){
    const [img,setimg]=useState("")
    const[loading,setloading]=useState(false)
    const[qrdata,setdata]=useState("")
    const[qrsize,setsize]=useState("")
    function download(){
        fetch(img)
        .then((response)=>response.blob()).then((blob)=>{
            const link=document.createElement("a");
            link.href=URL.createObjectURL(blob);
            link.download="qr.jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removechild(link);
        })
    }
   async function gentrate(){
        setloading(true)
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`;
            setimg(url)
        }
        catch(error){
            console.error("error generting Qr code",error);
        }
        finally{
            setloading(false)
        }
    }
return(
    <div className="Qrcode"> 
    <h1>Qr code gentartor</h1>
    {loading && <p>please wait...</p>}
    {img && <img src={img} alt="" />}
    <div>
        <label htmlFor="input" className="input-lable" >
            Data for Qr code:
        </label>
        <input type="text" id="input"  value={qrdata} placeholder="enter the data for qr code" onChange={(e)=>setdata(e.target.value)}/>
        <label htmlFor="size" className="input-lable">
            Image size (eg.,150):
        </label>
        <input type="text" value={qrsize} id="size" placeholder="enter the size of qr code" onChange={(e)=>setsize(e.target.value)}/>
        <button className="gentrate" disabled={loading} onClick={gentrate}>Gentrate the qrcode</button>
        <button className="download" onClick={download}>Download the Qr code</button>
    </div>
    <p className="footer">
        designed by vicky&&<a href="https://www.youtube.com/watch?v=t9r4cHJF9ho&list=RDGMEM916WJxafRUGgOvd6dVJkeQVMt9r4cHJF9ho&start_radio=1">Never give up...</a>
    </p>
    </div>
)
}

export default Qrcode