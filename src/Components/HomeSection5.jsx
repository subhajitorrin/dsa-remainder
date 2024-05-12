import React from "react";

function HomeSection5() {
  return (
    <div className=" h-screen pl-20 pr-20  homesection1 ">
      <div className="mb-[50px]">
        <h1 className="text-[50px] font-bold">FAQs</h1>
        <p className="font-semibold">
          Find answer to common questions about our service and the benifits of
          regular DSA practice
        </p>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <h3 className="text-[20px] font-bold">How does it work ?</h3>
        <p>
          Our sevice allows users to register and select the difficulty of the
          questions they want to receive. Everyday <br />
          at a specific time users will receive a remainder email with a link to
          the questino. On the site. there is a <br />
          dashboard that shows the questions send with the date. Users can also
          update their profile name and <br />
          subscribe to enable or disable remainders temporarily.
        </p>
        <hr />
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <h3 className="text-[20px] font-bold">How to register ?</h3>
        <p>
          To register, simply visit our website and click on the 'Sign Up'
          button. Fill in the required details ans choose <br />
          your preferred difficulty level for the quesstions.
        </p>
        <hr />
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <h3 className="text-[20px] font-bold">Why practice regularly ?</h3>
        <p>
          Regular DSA practice helps improve problem solving skills, enhances
          algorithmic thinking and boots <br />
          performance in coding interviews and competitive programming contests.
        </p>
        <hr />
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <h3 className="text-[20px] font-bold">How to update profile ?</h3>
        <p>
          To update your profile, log in to your account and go to the
          dashboard, Click on the Update Profile button <br />
          and make the necessary changes.
        </p>
        <hr />
      </div>
      <div className="flex flex-col gap-3 mb-8">
        <h3 className="text-[20px] font-bold">How to subscribe ?</h3>
        <p>
          To subscribe or unsubscribe from remainders, go to your profile
          settings on the dashboard, Toggle the <br />
          Reminders options to enable or disable them as per your preferences.
        </p>
        <hr />
      </div>
      <div className="flex flex-col gap-3 ">
        <h3 className="text-[30px] font-bold">Still have questions ?</h3>
        <p>Feel free to contact us for furthur assistance.</p>
        <button className="w-[120px] pl-5 pr-5 pt-2 pb-2 bg-tranparent text-black border-black border">
          Contact
        </button>
      </div>
    </div>
  );
}

export default HomeSection5;
