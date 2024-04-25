// import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import Link from "next/link";

// export default function Map() {
//   return (
//     <div style={{ width: "1000px", height: "600px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.6)" }}>
//       <div style={{ width: "100%", height: "100%", borderRadius: "10px" }}>
//         <MapContainer 
//           center={[52.45222390500246, 13.629550956087783]} 
//           zoom={5}
//           style={{ width: "100%", height: "100%", borderRadius: "10px" }}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <CircleMarker center={[52.45222390500246, 13.629550956087783]} radius={10} color="transparent" fillColor="green" opacity={0.5}>
//             <Popup>
//               <h2>Beauty salon</h2>
//               <Link href={"https://www.google.com/maps/place/Spreetunnel+Friedrichshagen/@52.4458238,13.62445,16.21z/data=!4m6!3m5!1s0x47a837e468b583bd:0x3a805b709ca90d0!8m2!3d52.4448517!4d13.6260483!16s%2Fg%2F120rr67b?authuser=0&entry=ttu"}>
//                 Spreetunnel Friedrichshagen
//               </Link>
//             </Popup>
//           </CircleMarker>
//         </MapContainer>
//       </div>
//     </div>
//   );
// }
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Map() {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <div style={{ width: "1000px", height: "600px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.6)" }}>
      <div style={{ width: "100%", height: "100%", borderRadius: "10px" }}>
        {isBrowser && (
          <MapContainer 
            center={[52.45222390500246, 13.629550956087783]} 
            zoom={5}
            style={{ width: "100%", height: "100%", borderRadius: "10px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CircleMarker center={[52.45222390500246, 13.629550956087783]} radius={10} color="transparent" fillColor="green" opacity={0.5}>
              <Popup>
                <h2>Beauty salon</h2>
                <Link href={"https://www.google.com/maps/place/Spreetunnel+Friedrichshagen/@52.4458238,13.62445,16.21z/data=!4m6!3m5!1s0x47a837e468b583bd:0x3a805b709ca90d0!8m2!3d52.4448517!4d13.6260483!16s%2Fg%2F120rr67b?authuser=0&entry=ttu"}>
                  Spreetunnel Friedrichshagen
                </Link>
              </Popup>
            </CircleMarker>
          </MapContainer>
        )}
      </div>
    </div>
  );
}
