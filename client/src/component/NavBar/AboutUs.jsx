import React from "react";
import { Container } from "react-bootstrap";

const Header = () => {
  return (
    <Container>
      <div className="jumbotron my-4">
        <h1 className="display-4">Take You To Corporates</h1>
        <p className="lead">
          A Solution Made for students of IET-DAVV
          <b>{process.env.REACT_APP_INSTITUTION_NAME}</b> to provide them a
          little help for there placements.
        </p>
        <hr className="my-4" />
        <p>
          College days are never easy for a newbie entering into college, from
          first MST in the first year to placements in the final year, there are
          several things he/she do for the first time, and in such a situation,
          if anyone can help them or guide them, the journey becomes very easy.
          <br />
          Being in final year student, seating in placement drives , we got
          ample experience and we all felt that if we got to know about company
          procedure and its experience then interviews would be much smoother.
          <br />
          It's not like we haven't got insight from placement cells, seniors or
          the internet. But some companies don't have such information due to a
          lack number of recruitments, college placement cell policies, presence
          of companies in Indore only. So we tried to solve all that problems by
          implementing a college-level experience-sharing web application. Our
          web application "Take you to corporate" is a solution to make college
          life smoother.
          <br />
          Our application is simple yet impactful, we kept all things easy and
          took all the good features of all the alternative applications present
          in the market and corrected their flaws. The most impactful thing we
          would work upon is
          </p>
          <ul>
            <li>
              Limitation of it to our College only - helps in improving accuracy
              and privacy
            </li>
            <li>Provided framing features for diagrammatic problems.</li>
          </ul>
          <p>
          Our application is <b>MERN</b> (MongoDB, Express,React, Node) based
          that has the functionality to log in using college mail
          and share and get all the information provided, comments section for
          discussion, search section with company search etc. Our aim for
          building it is we should learn from other successes as well as what
          they were lacking and also share your insights for others. As a whole,
          we get helped by our college community and we pay back by helping
          others.
        </p>
      </div>
    </Container>
  );
};

export default Header;