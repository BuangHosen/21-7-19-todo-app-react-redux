import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import TaskForm from "~/components/material/TaskForm";
import { getTaskByIdRequest, updateTaskRequest } from "~/redux/tasksDux";

function UpdateTask() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { taskId } = router.query;
  const {
    user: { profile },
    tasks: { description }
  } = useSelector(state => state);

  const handleSubmit = task => {
    dispatch({
      type: updateTaskRequest.type,
      payload: {
        id: taskId,
        description: task.description,
        token: profile?.token
      }
    });
  };

  useEffect(() => {
    if (taskId) {
      dispatch({
        type: getTaskByIdRequest.type,
        payload: {
          id: taskId,
          token: profile?.token
        }
      });
    }
  }, [taskId]);

  return <TaskForm description={description} onSubmit={handleSubmit} />;
}

export default UpdateTask;
