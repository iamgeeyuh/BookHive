import "./LoggedOutSchedule.css";
import LoggedOutScheduleDay from "../loggedOutScheduleDay/LoggedOutScheduleDay";

const LoggedOutSchedule = () => {
  return (
    <div className="logged-out-schedule-container">
      <div className="logged-out-schedule-title">Weekly Hours</div>
      <div className="logged-out-schedule-table">
        <LoggedOutScheduleDay
          day=""
          libraryHours="Dibner Library"
          serviceHours="Service Desk"
          isTitle={true}
        />
        <LoggedOutScheduleDay
          day="Monday"
          libraryHours="7am-1am"
          serviceHours="10am-8pm"
          backgroundColor="rgba(233, 149, 107, 0.22)"
        />
        <LoggedOutScheduleDay
          day="Tuesday"
          libraryHours="7am-1am"
          serviceHours="10am-8pm"
          backgroundColor="rgba(255, 255, 255, 0.22)"
          color="#AF5E36"
        />
        <LoggedOutScheduleDay
          day="Wednesday"
          libraryHours="7am-1am"
          serviceHours="10am-8pm"
          backgroundColor="rgba(233, 149, 107, 0.22)"
        />
        <LoggedOutScheduleDay
          day="Thursday"
          libraryHours="7am-1am"
          serviceHours="10am-8pm"
          backgroundColor="rgba(255, 255, 255, 0.22)"
          color="#AF5E36"
        />
        <LoggedOutScheduleDay
          day="Friday"
          libraryHours="7am-1am"
          serviceHours="10am-7pm"
          backgroundColor="rgba(233, 149, 107, 0.22)"
        />
        <LoggedOutScheduleDay
          day="Saturday"
          libraryHours="7am-1am"
          serviceHours="12pm-6pm"
          backgroundColor="rgba(255, 255, 255, 0.22)"
          color="#AF5E36"
        />
        <LoggedOutScheduleDay
          day="Sunday"
          libraryHours="7am-1am"
          serviceHours="12pm-8pm"
          backgroundColor="rgba(233, 149, 107, 0.22)"
        />
      </div>
    </div>
  );
};

export default LoggedOutSchedule;
