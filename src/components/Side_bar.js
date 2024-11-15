import React from 'react';

function Side_bar({ setSelectedDay, selectedDay }) {
  return (
    <div className='relative md:w-[35vw] xl:w-[20vw] lg:w-[30vw]  w-full sm:w-[15vw] font-bold bg-slate-400'>
      <div>
        <h1 className='p-4 text-3xl font-bold'>Task Manager</h1>
      </div>
      <div className='mt-9 '>
        <div
          className={`text-lg pl-6 p-2 border-b cursor-pointer hover:bg-[#af99c7] ${selectedDay==='Today'? "bg-[#8c6eae]":"" } `}
          onClick={() => setSelectedDay('Today')}
        >
          Today
        </div>

        <div
          className={`text-lg pl-6 p-2 border-b cursor-pointer hover:bg-[#af99c7] ${selectedDay==='Upcoming'? "bg-[#8c6eae]":"" } `}
          onClick={() => setSelectedDay('Upcoming')}
        >
          Upcoming
        </div>


        <div
          className={`text-lg pl-6 p-2 border-b cursor-pointer hover:bg-[#af99c7] ${selectedDay==='Overdue'? "bg-[#8c6eae]":"" } `}
          onClick={() => setSelectedDay('Overdue')}
        >
          Overdue
        </div>
        
        <div
          className={`text-lg pl-6 p-2 border-b cursor-pointer hover:bg-[#af99c7] ${selectedDay==='Completed'? "bg-[#8c6eae]":"" } `}
          onClick={() => setSelectedDay('Completed')}
        >
          Completed
        </div>
      </div>
    </div>
  );
}

export default Side_bar;
