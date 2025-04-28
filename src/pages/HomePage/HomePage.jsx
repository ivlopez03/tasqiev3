import CreateWorkspaceModal from "../../components/homepage/createWorkspaceModal";
import WorkspaceCard from "../../components/homepage/WorkspaceCard";
import HelpIcon from "../../assets/HelpIcon";
import SettingsIcon from "../../assets/SettingsIcon";
import { FaRegClock } from "react-icons/fa";
import { IoStatsChart,IoAdd } from "react-icons/io5";


import { ColorRing } from "react-loader-spinner";
import { useState } from "react";
import { useWorkspaces } from "../../context/workspaceContext/WorkspaceContext";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const HomePage = () => {
  const { user } = useAuth();

  const { workspaces, createWorkspace, loading  } = useWorkspaces();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWorkspaceCreated = (newWorkspace) => {
    createWorkspace(newWorkspace);
  };

  function formatTodayDate() {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      new Date(),
    );
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return (
    <div className="h-screen bg-base-200 overflow-y-auto ">
      
      <div className="relative">
        <div className=" p-5 flex items-center relative justify-between ">
          <div className="text-2xl font-bold  ">
            Dashboard
            <div></div>
            <span className="text-sm text-gray-500 font-light">
                {formatTodayDate()}
              </span>
            </div>
          <div className="flex gap-4 px-10">
            <div>
              <HelpIcon />
            </div>
            <div>
              <SettingsIcon />
            </div>
          </div>
        </div>

        <div className="p-5">
        

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FaRegClock className="h-5 w-5 mr-2 text-blue-600" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            <p className="text-gray-500 text-sm">No recent activity to show.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <IoStatsChart className="h-5 w-5 mr-2 text-blue-600" />
            Stats
          </h2>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Tasks</p>
              <p className="text-2xl font-bold text-blue-700">0</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-700">0</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-700">0</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Workspaces</p>
              <p className="text-2xl font-bold text-purple-700">{workspaces.length}</p>
            </div>
          </div>
        </div>
      </div>


          <div>
            <div className="mt-10 relative  ">
              <div className="flex items-center justify-between text-md px-3 mb-4  relative">
                <h2 className="text-lg font-semibold ">My Workspaces</h2>
                <button
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  onClick={() => setIsModalOpen(true)}
                >
                  <IoAdd />
                  <span className="text-sm">Create Workspace</span>
                </button>
              </div>
              {loading ? (
                <div className="flex justify-center items-center w-full h-52">
                  <div className="text-sm">
                    <div>Fetching data</div>
                    <div className="flex items-center justify-center">
                      <ColorRing
                        height="40"
                        width="40"
                        ariaLabel="color-ring-label"
                        colors={[
                          "#2563eb",
                        ]}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4 py-2 relative ">
                  {workspaces.map((card) => (
                    <WorkspaceCard
                      key={card.id}
                      workspace={card}
                      workspaces={workspaces}
                    />
                  ))}

                  
                  <CreateWorkspaceModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    onWorkspaceCreated={handleWorkspaceCreated}
                  

                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
