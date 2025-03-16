// app/admin/panel/layout.js (Custom layout for the Admin Panel)
import AdminNavbar from "../AdminNavbar";
export default function AdminPanelLayout({ children }) {
    return (
      <>
        
        <body>
            <div className="font-roboto-condensed">
            <AdminNavbar/>
            {children} {/* Render the page content here */}
            </div>
  
        </body>
        </>
   
    );
  }
  
