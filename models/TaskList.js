class TaskService {
    constructor(arrTask) {
        //danh sách các Task dc lưu trong localStorage
        this.taskList = arrTask;
    }
    addTask(task) {
        // this.taskList.push(task);
        if (this.taskList) {
            this.taskList = [...this.taskList, task];
        } else {
            this.taskList = [task];
        }
    }
    deleteTask(_id) {
        let taskIndex = this.taskList.findIndex(item => item.id == _id);
        this.taskList.splice(taskIndex, 1);
    }

    changeStatus(_id) {
        let task = this.taskList.find(item => item.id == _id);
        if (task.status === 'todo') {
            task.status = 'complete';
        } else {
            task.status = 'todo';
        }
    }

}
export default TaskService;