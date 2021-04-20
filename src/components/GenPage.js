import {useRef,useState} from 'react'
import '../App.css';
import {TwitterPicker} from 'react-color'
const QRCode = require('qrcode')



const GenPage = () => {

    const inpField = useRef('')
    const cnvField = useRef('')
    const [darkColor,setDark] = useState('#000')
    const [lightColor, setLight] = useState('#FFF')
    const [toast,setToast] = useState('')

    const opts = {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.3,
        margin: 2,
        color: {
          dark:darkColor,
          light:lightColor
        },
        width: 350
      }
    
    

    const btnCliked = async() => {
        let text = inpField.current.value
        let canvas = cnvField.current
        if (!text){
            alert('Please enter a text')
            return
        }
        try{
            await QRCode.toCanvas(canvas,text,opts)
        }
        catch (err){
            console.error(err)
            return
        }

        setToast('Click/Tap on Image to Save')
        setTimeout(()=>{setToast('')},3500)


    }

    const checkColor1 = (color) => {
        setDark(color.hex)
    }

    const checkColor2 = (color) => {
        setLight(color.hex)
    }

    const download = async() => {
       var link = document.createElement('a')
       link.download = 'QRCode.png'
       link.href = cnvField.current.toDataURL()
       link.click()
      
    }

    return (
        <div>
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-12">
                    <input type="text" className="form-control" placeholder="Enter String/URL" ref={inpField}/>
                </div>
            </div>
        </div>
        <div className="container mt-2">
            <div className="row justify-content-md-center">
                <div className="col-md-4">
                    <label className='form-control bg-dark text-white'>Choose Foreground Color</label>
                    <TwitterPicker onChangeComplete={checkColor1} color={darkColor} width={'100%'}/>
                </div>
                <div className="col-md-4">
                    <label className='form-control'>Choose Background Color</label>
                    <TwitterPicker onChangeComplete={checkColor2} color={lightColor} width={'100%'}/>
                </div>
            </div>
            <hr className='hr2'></hr>
        </div>
        
        <button className="btn btn-success" onClick={btnCliked}>Generate QR</button><br/>
        <p className="lead badge badge-pill badge-info mt-2">{toast}</p>
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                <canvas id="myCanvas" ref={cnvField} onClick={download}></canvas>
                </div>
            </div>
        </div>
        </div>
    )
}

export default GenPage