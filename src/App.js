import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
 
// !!!alex hi!!!!

///********max */

 
// !!!alex hi!!!!

function App() {
  const position = [46.469569, 30.707517];
  const mapRef = useRef(null);
  const [bounds, setBounds] = useState(null);
  const [style, setStyle] = useState("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png");

  useEffect(() => {
    const delay = 1000; // Встановлюємо затримку в 1 секунду перед підпискою на події карти

    const timerId = setTimeout(() => {   // Встановлюємо таймер для затримки

      if (mapRef.current) { // Перевіряємо наявність посилання на карту перед підпискою на події

        const handleMoveEnd = () => { // Функція, яка викликається при закінченні переміщення карти
          const newBounds = mapRef.current.getBounds();
          setBounds(newBounds);
          console.log(newBounds);
        };

        const handleZoomEnd = () => { // Функція, яка викликається при закінченні зміни масштабу карти
          const newBounds1 = mapRef.current.getBounds();
          setBounds(newBounds1);
          console.log(newBounds1);
        };

        // Підписуємося на події переміщення та зміни масштабу карти
        mapRef.current.on('moveend', handleMoveEnd);
        mapRef.current.on('zoomend', handleZoomEnd);

        return () => {
          // Повертаємо функцію для відписки від подій при розмонтуванні компоненту
          mapRef.current.off('zoomend', handleZoomEnd);
          mapRef.current.off('moveend', handleMoveEnd);
        };
      }
    }, delay);

    return () => clearTimeout(timerId);  // Повертаємо функцію для очищення таймеру при розмонтуванні компоненту

  }, [mapRef]);

   // Створюємо іконки для маркерів
   const icons=[];
   for(let i=0;i<20;i++)
   {
    const customIcon = new window.L.divIcon({
      className: 'custom-marker',
      html: `<div class="custom-marker-content"><p class="custom-marker-txt">$${i+11}</p></div>`,
    });
    icons.push(customIcon)

  // const customIcon1 = new window.L.divIcon({
  //   className: 'custom-marker',
  //   html: '<div class="custom-marker-content"><p class="custom-marker-txt">$152</p></div>',
  // });
  // const customIcon2 = new window.L.divIcon({
  //   className: 'custom-marker',
  //   html: '<div class="custom-marker-content"><p class="custom-marker-txt">$52</p></div>',
  // });
  // const customIcon3 = new window.L.divIcon({
  //   className: 'custom-marker',
  //   html: '<div class="custom-marker-content"><p class="custom-marker-txt">$1000</p></div>',
  // });

  // Створюємо масив з маркерами та їх даними
  const markers=[];
  for(let i=0;i<20;i++)
  {
   const lat=46.469569+i/550;
   const lng=30.707517+i/550;
    const marcer ={
          geocode: [lat, lng],
          popUp: `hello ${i}`,
          customIcon: icons[i],
        }
        markers.push(marcer)
  }
  // const markers = [
  //   {
  //     geocode: [48.86, 2.3412],
  //     popUp: 'hello 0',
  //     customIcon: customIcon1,
  //   },
  //   {
  //     geocode: [48.85, 2.3522],
  //     popUp: 'hello 1',
  //     customIcon: customIcon2,
  //   },
  //   {
  //     geocode: [48.84, 2.3632],
  //     popUp: 'Helсісlo',
  //     customIcon: customIcon3,
  //   },
  // ];
//ky ky
  const handleStyleChange=(event)=>{
    setStyle(event.target.value)
    console.log(event.target.value)
  }
  return (
    <div>
      <select name="" id="" onChange={handleStyleChange} className='selectStyle'>
        <option value="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">a openstreetmap</option>
        <option value="https://b.tile.openstreetmap.org/{z}/{x}/{y}.png" >b openstreetmap</option>
        <option value="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" >hot</option>
        <option value="http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png" >cycle</option>
        <option value="http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" >osmfr</option>
        <option value="https://c.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png" >cyclosm</option>
      </select>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: '50vh',marginTop:'10%'}}

        ref={mapRef}
      >
        <TileLayer
        
           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           url={style}
        />

        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={marker.customIcon}>
            <Popup>
              <div>
                <h2>{marker.popUp}</h2>
                <button className="buttonMarcer" onClick={() => alert('hello')}>
                  Click
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
        {/* Відображення координат та інформації про маркери */}
          <div style={{marginLeft:'50%',marginTop:'4%'}}>
          {bounds && (
                  <div>
                    <h3>Bounds:</h3>
                    <p>NorthEast: {bounds.getNorthEast().toString()}</p>
                    <p>SouthWest: {bounds.getSouthWest().toString()}</p>
                    <ul>
                    {markers.map((marker, index) => (
                      // Відображення маркера тільки якщо його координати попадають в область видимості
                     marker.geocode[0] > bounds.getSouthWest().lat &&
                     marker.geocode[0] < bounds.getNorthEast().lat &&
                     marker.geocode[1] > bounds.getSouthWest().lng &&
                     marker.geocode[1] < bounds.getNorthEast().lng &&
                      (
                      <li key={index}>
                      {marker.popUp}--  {marker.geocode[0]}-{marker.geocode[1]}
                      </li>
                    )
                      ))}
                    </ul>
                  </div>
                )}
          </div>
      
    </div>
  );
}

export default App;
