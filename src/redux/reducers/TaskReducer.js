const initialState = {
  lstTaskDeTail: {
    priorityTask: {
      priorityId: 1,
      priority: "High",
    },
    taskTypeDetail: {
      id: 1,
      taskType: "bug",
    },
    assigness: [
      {
        id: 320,
        avatar: "https://ui-avatars.com/api/?name=admin",
        name: "admin",
        alias: "admin",
      },
    ],
    lstComment: [],
    taskId: 1039,
    taskName: "Task3",
    alias: "task3",
    description:
      '<p><span style="background-color: #2dc26b;">CYBERSOFT</span></p>',
    statusId: "3",
    originalEstimate: 5,
    timeTrackingSpent: 3,
    timeTrackingRemaining: 0,
    typeId: 1,
    priorityId: 1,
    projectId: 1137,
  },
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};
