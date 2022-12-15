import { BACKEND_URL } from "config/constants";
import axios from "./axiosInstanceJWT";

export const roomAPI = {
  /*-----------------POST NEW TASK------------*/
  getAvailableBookings(datesInput: DatesInput) {
    alert(BACKEND_URL.dynGetBookingsAvailability(datesInput));
    return axios.post<ITarea>(
      BACKEND_URL.dynGetBookingsAvailability(datesInput)
    );
  },
  /* ------------------------------------------- */
  updateTask(task: ITarea, userID: string) {
    return axios.put<ITarea>(
      `${BACKEND_URL.TASKS}/${userID}/${task._id}`,
      task
    );
  },
  getTasks: function (controller?: AbortController) {
    return axios.get<ITarea[]>(BACKEND_URL.TASKS, {
      signal: controller?.signal,
    });
  },
  deleteTask: async function (id: string, userID: string) {
    return axios.delete<void>(`${BACKEND_URL.TASKS}/${userID}/${id}`);
  },
};
