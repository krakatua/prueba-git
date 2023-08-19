import React from "react";
import { GoPeople } from "react-icons/go";

function Followers({ url }) {
  const [follow, setFollow] = React.useState([]);

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setFollow(data);
      });
  }, [url]);

  return (
    <div className='flex justify-center items-center gap-1 text-gray-400'>
        
      <GoPeople />
      {follow.length}
    </div>
  );
}

export default Followers;