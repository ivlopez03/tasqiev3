/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */



const DeleteWorkspaceNotification = ({ workspace }) => {
    return(
        <div className="bg-white p-5 rounded-xl shadow-md border absolute bottom-10">
            <div>
                <h2 className="text-md font-semibold mb-4">Workspace Deleted</h2>
                <p className='text-sm'>The workspace "<span className='font-semibold'>{workspace.workspace_title}</span>" has been deleted.</p>
            </div>

        </div>

    );

};

export default DeleteWorkspaceNotification;