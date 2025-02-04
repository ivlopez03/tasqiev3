import CreateWorkspaceModal from "../../components/homepage/createWorkspaceModal";
import WorkspaceCard from "../../components/homepage/WorkspaceCard";
import PlusIcon from "../../assets/PlusIcon";
import HelpIcon from "../../assets/HelpIcon";
import SettingsIcon from "../../assets/SettingsIcon";

import { ColorRing } from "react-loader-spinner";
import { useState } from "react";
import { useWorkspaces } from "../../context/workspaceContext/WorkspaceContext";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const HomePage = () => {
  const { user } = useAuth();

  const { workspaces, createWorkspace, loading } = useWorkspaces();

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
    <div className="h-screen ">
      <div className="relative">
        <div className="border-b border-gray-700 p-4 flex items-center relative justify-between ">
          <div className="text-lg font-light  ">Dashboard</div>
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
          <div className="pb-5">
            <span className="text-lg font-semibold">Hello, {user.name} !</span>
            <div>
              <span className="text-[#909090] font-light">
                {formatTodayDate()}
              </span>
            </div>
          </div>
          <div>
            <div className="w-[600px] h-[25rem] relative overflow-hidden rounded-md shadow-sm  ">
              <div className="flex items-centertext-md px-3 relative">
                <div className="flex items-center gap-1">
                  Workspaces{" "}
                  <span className="text-white bg-black text-[9px] px-2 py-1 rounded-xl">
                    {workspaces.length}
                  </span>
                </div>
                <Link to={"/workspaces"} className="absolute right-3">
                  <span className=" underline text-sm">See all</span>
                </Link>
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
                          "#45aeee",
                          "#e8488a",
                          "#fff232",
                          "#66cc8a",
                          "#cbcbcb",
                        ]}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4 py-2 relative  ">
                  {workspaces.map((card) => (
                    <WorkspaceCard
                      key={card.id}
                      workspace={card}
                      workspaces={workspaces}
                    />
                  ))}

                  {workspaces.length < 8 && (
                    <div className="flex items-center p-3  w-[270px] min-w-[270px]">
                      <div
                        className="lg:tooltip lg:tooltip-open lg:tooltip-right"
                        data-tip="Add workspace"
                      >
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className=" flex items-center justify-center border rounded-md   w-10 h-10 mr-1 text-gray-400 hover:bg-gray-600"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    </div>
                  )}
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
