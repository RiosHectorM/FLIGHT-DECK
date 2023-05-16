import { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useSession } from "next-auth/react";
import axios from "axios";

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [flightstoCertify, setFlightsToCertify] = useState();
  // const { user } = useUserStore();
  // const id = user?.id;
  const { data: session } = useSession();
  const { user, fetchUserByEmail } = useUserStore();


  useEffect(() => {
    if (session?.user?.email) {
      const email = session.user.email;
      fetchUserByEmail(email);
    }
  }, [session, fetchUserByEmail]);

  useEffect(() => {
    async function getFlightsToCertify() {
      const id = user?.id;
      if (id){
        return await axios
          .get(
            `/api/flight/getFlightsToCertifyByInstructorId/${id}`
          )
          .then((response: any) => response.data);
        // .then((data) => matriculas=data.map((avion: { registrationId: string; })=>avion.registrationId))
      }
    }

    const notifications = getFlightsToCertify();
    notifications.then((data) => {
      setFlightsToCertify(data);
    });
  }, [user]);

  const notifications = [
    {
      id: 1,
      message: "New certification request from John Doe",
      time: "5 minutes ago",
    },

  ];

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <div className="relative ml-auto">
      {/* CAMPANITA COMENTADA
      <button
        type="button"
        className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        onClick={toggleNotifications}
        title="Notifications"
      >
        <FaBell className="w-6 h-6" />
      </button> */}
      {showNotifications && (
        <div className="absolute top-12 right-0 z-10 w-80 max-h-80 overflow-auto bg-white border border-gray-200 rounded shadow-lg">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Notifications
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Here are your latest notifications
            </p>
          </div>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>
                <div className="block px-4 py-3 text-sm">
                  <p className="font-medium text-gray-900">
                    {notification.message}
                  </p>
                  <p className="mt-1 text-gray-500">{notification.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;