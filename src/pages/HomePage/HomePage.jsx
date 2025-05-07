import CreateWorkspaceModal from "../../components/homepage/createWorkspaceModal";
import WorkspaceCard from "../../components/homepage/WorkspaceCard";
import HelpIcon from "../../assets/HelpIcon";
import SettingsIcon from "../../assets/SettingsIcon";
import { FaRegClock } from "react-icons/fa";
import { IoStatsChart,IoAdd } from "react-icons/io5";
import { LuFolderKanban } from "react-icons/lu";


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
    <div className="h-screen bg-base-200  overflow-y-auto ">
      
      <div className="relative">
        <div className=" p-5 flex items-center relative justify-between ">
          <div className="text-2xl font-bold  ">
            Dashboard
            <div></div>
            <span className="text-sm text-neutral-400 font-light">
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
        <div className="col-span-1 md:col-span-2  rounded-lg bg-base-100 p-5  ">
          <h2 className="text-lg font-semibold  mb-4 flex items-center">
            <FaRegClock className="h-5 w-5 mr-2 " />
            Recent Activity
          </h2>
          <div className="space-y-3">
            <p className="text-neutral-400 text-sm">No recent activity to show.</p>
          </div>
        </div>

        {/* Stats   */}
        <div className="bg-base-100 rounded-lg  p-5  ">
          <h2 className="text-lg font-semibold  mb-4 flex items-center">
            <IoStatsChart className="h-5 w-5 mr-2 " />
            Stats
          </h2>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="bg-primary p-4 rounded-lg">
              <p className="text-sm text-primary-content ">Tasks</p>
              <p className="text-2xl font-bold text-primary-content">0</p>
            </div>
            <div className="bg-accent p-4 rounded-lg">
              <p className="text-sm text-accent-content ">Completed</p>
              <p className="text-2xl font-bold text-accent-content">0</p>
            </div>
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-sm text-secondary-content ">Pending</p>
              <p className="text-2xl font-bold text-secondary-content">0</p>
            </div>
            <div className="bg-neutral p-4 rounded-lg">
              <p className="text-sm  text-neutral-content">Workspaces</p>
              <p className="text-2xl font-bold text-neutral-content">{workspaces.length}</p>
            </div>
          </div>
        </div>
      </div>


          <div>
            <div className="mt-10 relative bg-base-100 p-5 rounded-lg ">
              <div className="flex items-center justify-between text-md px-3 mb-4  relative">
                <h2 className="text-lg font-semibold  mb-4 flex items-center">
                  <LuFolderKanban className="h-5 w-5 mr-2 " />
                  My workspaces
                </h2>
              
                <button
                  className="flex items-center gap-1"
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
                          "gray",
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
