import React from "react";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";
import TuitStats from "./tuit-stats"

const Tuit = ({tuit, deleteTuit, likeTuit, dislikeTuit}) => {
  return(
    <li className="p-2 ttr-tuit list-group-item d-flex rounded-0">
      <div className="pe-2">
        {
          tuit.postedBy &&
          <img src={`../images/${tuit.postedBy.username}.jpg`}
               className="ttr-tuit-avatar-logo rounded-circle"/>
        }
      </div>
      <div className="w-100">
          <i onClick={() => deleteTuit(tuit._id)} className="fas fa-remove fa-2x fa-pull-right"></i>
        <h2
          className="fs-5">
          {tuit.postedBy && tuit.postedBy.username}
          @{tuit.postedBy && tuit.postedBy.username} -
          { tuit.postedOn}</h2>
        {tuit.tuit}
          <TuitStats tuit={tuit} likeTuit={likeTuit} dislikeTuit={dislikeTuit}/>

          {
          tuit.youtube &&
            <TuitVideo tuit={tuit}/>
        }
        {
          tuit.image &&
          <TuitImage tuit={tuit}/>
        }
      </div>
    </li>
  );
}
export default Tuit;