import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + App Links */}
        <div>
          <h2 className="text-xl font-bold flex items-center space-x-2">
            <span className="bg-blue-500 text-white px-3 py-1 rounded">
              mangcoding
            </span>
          </h2>
          <p className="text-gray-600 mt-3">
            Download the app by clicking the link below:
          </p>
          <div className="flex space-x-3 mt-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
              alt="Google Play"
              className="w-32"
            />
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADgAOAMBEQACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAADBgAHAQIFBP/EADIQAAIBAgQEAwcDBQAAAAAAAAECAwAEBQYREiExQWFxgZETFCJCUVKxMsHhByMzodH/xAAaAQACAwEBAAAAAAAAAAAAAAAABQECBgME/8QALREAAQQBAwIDBwUAAAAAAAAAAQACAxEEBSExEkFRcdEkYYGRseHwExUyocH/2gAMAwEAAhEDEQA/AHbNGY7iW7ks7GVooIiVd0OjOw58eg/NPMLCaGCSQWSstqepSPkMURpo7jkn0SyzljqxJJ6k0zAA4SQ77lY3VKKU3UIpTdQillZGUgqSpHIg6GoIB5QLBsJpyrmOdbuOxvpGljlO2ORzqyt0BPUHlSvOwm9BkjFEJ7pepSCQQymweD3BSgzlmLE6knUmm4FJMdzaxu70Uil0MBS0nxe2iv8A/A7aEa6AnTgD210rz5Re2Fxj5XpwmRPna2Xg/gTwuU8NXEJLhogYCgCwEnardT+OHjSQ6jMYw29/FaMaRjiUvI28PekDEfd0v7hbMk24kIjOuvCn8PWY2l/NbrMTtYJXCP8Ajey827vXSlypbJIUdXQ6MpDA/QioLQRRUiwQR2QN1XV6U3UIpevCbKXFMQhtIdQXPxN9q9TXGeVsMZeV2x4HTyiNvdWXjEjSCDB7eYpPdKQ0nNkjA+JvE8vPtWbxxVzuGzfqtVkkuAgaaLu/gO/oqvvLeWyupbWddskTbWH7+FaeN7ZGB7eCslJE6J5Y7kIO6rqlKbqEUg7u9XpdKWPar9w9amio2VjZKw6PCcIkxW+IjaZN5LfJEOI9efpWc1GYzzCFnb6rR6bAIITM/Yn+glm2zRrmpcWnP9pm9mU1/REeA9OfrTN+B7L+i3nn4pYzO9r/AF3ccfD83Xf/AKgYUs1smL2wBKACYr8ydG8vwe1eDSsjpcYXd+PNe/VcYPaJ29ufJIHtV+4etP6KQbLO7vUUppaRyKsiM6B1DAlSf1DXlUkEggLqBuLVp4TmXD8S1iw/D7pzGgLIsSgIPXSsvPgyw7yPG/vPotLDmRy7RtO3uCFPnfCYJHgnhvEkQ7WR4dCD4a1dulTuAc0ivNVdqULSWuBvyQjnnAWBDRTkHgQYR/2rftWV4j5qv7lj+B+SLk/HbbEWurCIbUhYtbq3AmIngNO3Lw0qmfiPiDZD358/upwslknVGO3Hl9vREzFmLC8MeaxvbSWR2j1CezG2QHvr5VGJhTTASMdW/jwrZOXDFbHtv/VVQbhWopZoBDfVHZGGjKSCPoasKItdS2jSbco5psMDwq5hmt5GuWcupQDR+AABPTT96U5+BLkytc07fRMsPLZBGQRula6u5bu5lubh90srFnPc00ZG2NoY3gJc4ue4udyULfVqUUvVheIzYZiEF7bn44m1014MOoPiK5TQtmjMbu66RPdE8Pb2XfzrmOwx2Oz9zhkWSLUu8igEA/Lz4/xXh07Clxi7rOx/LXrzsmOcN6RuEsRBpZUijGruwVR9SToKZOIaCSvAG2aCcc65Qu0vZsRwqFp4ZmLyQxjV0Y8yB1B58ONKNO1FhYIpTRHB8U2zMJwcXxiwUkyK8TlJUZHHNXBBHkadAgiwUtLSOVruqaRSm6ikUpuopFLaNJJXCRRvI55KilifIVBIaLJpAaTwnrJGULr32LE8VhaCOE74YHGjM3RiOgH056/7R6jqLOgxRGyeSmeHhO6hJIKrgL//2Q=="
              alt="App Store"
              className="w-32"
            />
          </div>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-lg font-semibold">Pages</h3>
          <ul className="text-gray-600 mt-3 space-y-2">
            <li>Home it work</li>
            <li>Pricing</li>
            <li>Blog</li>
            <li>Demo</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold">Service</h3>
          <ul className="text-gray-600 mt-3 space-y-2">
            <li>Shopify</li>
            <li>WordPress</li>
            <li>UI/UX Design</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold">Contact</h3>
          <ul className="text-gray-600 mt-3 space-y-2">
            <li className="flex items-center space-x-2">
              <FaPhone className="text-blue-500" />
              <span>(+84) 971-443-902</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-blue-500" />
              <span>suhoang0971@gmail.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>2972 Westheimer Rd. Santa Ana, Illinois 85486</span>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
