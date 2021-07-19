import React, { useEffect } from "react";
import { SvgIcon, Tooltip, IconButton } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Edit as EditIcon, Trash2 as Trash2Icon } from "react-feather";
import DashboardLayout from "~/components/layouts/dashboard";
import withAuthGuard from "~/components/material/withAuthGuard";
import Table from "~/components/material/Table";
import { getTasksRequest, deleteTaskRequest } from "~/redux/tasksDux";

const Profile = withAuthGuard(() => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    user: { profile },
    tasks: { data, loading }
  } = useSelector(state => state);

  const handleDelete = id => {
    dispatch({
      type: deleteTaskRequest.type,
      payload: {
        id,
        token: profile?.token
      }
    });
  };

  const handleEdit = id => router.replace(`/task/edit/${id}`);

  const handleOpen = () => router.replace("task/create");

  useEffect(() => {
    dispatch({
      type: getTasksRequest.type,
      payload: profile?.token
    });
  }, []);

  useEffect(() => {
    if (loading) {
      dispatch({
        type: getTasksRequest.type,
        payload: profile?.token
      });
    }
  }, [loading]);

  const renderActions = id => {
    return (
      <div>
        <Tooltip title="Update">
          <IconButton onClick={() => handleEdit(id)}>
            <SvgIcon fontSize="small">
              <EditIcon />
            </SvgIcon>
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => handleDelete(id)}>
            <SvgIcon fontSize="small">
              <Trash2Icon />
            </SvgIcon>
          </IconButton>
        </Tooltip>
      </div>
    );
  };

  return (
    <Table
      title="Todo list"
      onOpen={handleOpen}
      tableHead={["No", "Task Name", "Action "]}
      tableData={data.map(({ _id, description }, key) => [
        key + 1,
        description,
        renderActions(_id)
      ])}
    />
  );
});

Profile.Layout = DashboardLayout;

export default Profile;
