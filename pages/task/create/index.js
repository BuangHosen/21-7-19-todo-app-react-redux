import { useDispatch, useSelector } from "react-redux";
import TaskForm from "~/components/material/TaskForm";
import { addTaskRequest } from "~/redux/tasksDux";

function CreateTask() {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.user);

  const handleSubmit = ({ description }) => {
    dispatch({
      type: addTaskRequest.type,
      payload: { description, token: profile?.token }
    });
  };
  return <TaskForm onSubmit={handleSubmit} />;
}

export default CreateTask;
