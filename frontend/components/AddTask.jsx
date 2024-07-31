import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from "react-redux";
import { setTasksData } from '@/redux/reduxSlices/tasksSlice';
import axios from '@/core/dataFetchingConfigs/axiosGlobalConfig';

function AddTaskForm({ status, setTasks, enableStatusDropdown, isDisabled }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: status ? status : 'toDo',
    priority: 'Low',
    deadline: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/tasks', taskData);
      if (response.status === 201) {
        const data = response.data;
        setTasks((tasks) => {
          let x = [...tasks, data];
          return x;
        });
        dispatch(setTasksData(data));
        handleClose();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none" onClick={handleShow}>
        Add Task +
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                name="description"
                value={taskData.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                className="form-control"
                name="status"
                value={taskData.status}
                onChange={handleChange}
                disabled={!isDisabled}
              >
                <option value="toDo">To-Do</option>
                <option value="inProgress">In Progress</option>
                <option value="underReview">Under Review</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                className="form-control"
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div className="form-group">
              <label>Deadline</label>
              <input
                type="date"
                className="form-control"
                name="deadline"
                value={taskData.deadline}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <div className="flex justify-between mx-3 p-3">
          <div className="w-[25%]">
            <button className="btn btn-back" onClick={handleClose}>
              Close
            </button>
          </div>
          <div className="w-[25%]">
            <button className="btn btn-back" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddTaskForm;
