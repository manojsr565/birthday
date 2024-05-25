const friendSelect = document.getElementById('friend-select');
const messageDiv = document.getElementById('message');
const bodyElement = document.body; // Reference the body element

// Define image paths for different scenarios
const birthdayImagePath = 'Images//bd2.gif'; // Path to birthday background image
const defaultImagePath = 'Images//waiting.gif'; // Path to default background image
const noSelectionImagePath = 'Images//Birthday.gif'; // Path to no selection background image

friendSelect.addEventListener('change', function() {
  const selectedFriend = this.value;

  if (selectedFriend) {
    const parts = selectedFriend.split(':');
    const friendName = parts[0];
    const friendBirthdayString = parts[1]; // Assuming format is "name:month-day"

    const friendBirthdayMonth = parseInt(friendBirthdayString.split('-')[0]) - 1; // Month (0-indexed)
    const friendBirthdayDay = parseInt(friendBirthdayString.split('-')[1]);

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    // Check for birthday in current year
    if (friendBirthdayMonth === currentMonth && friendBirthdayDay === currentDay) {
      // Today is the friend's birthday!
      messageDiv.textContent = `Happy Birthday, ${friendName}! Wishing you a wonderful day and even more amazing year ahead 🥳🎉`;
      messageDiv.style.backgroundImage = `url(${birthdayImagePath})`; // Set birthday background image
      messageDiv.style.backgroundRepeat ='no-repeat';
      messageDiv.style.backgroundSize = "content";
      messageDiv.style.backgroundPosition = "center";
    } else {
      // Birthday is not today
      messageDiv.style.backgroundImage = `url(${defaultImagePath})`; // Set default background image
      // messageDiv.style.backgroundRepeat ='no-repeat';
      messageDiv.style.backgroundSize = 'content'; // Resize background image to fit entire screen


      const isThisYearBirthday = friendBirthdayMonth === currentMonth && friendBirthdayDay > currentDay;
      // const isNextYearBirthday = friendBirthdayMonth > currentMonth;

      if (isThisYearBirthday) {
        // Birthday in current year but not yet passed
        const birthday = new Date(today.getFullYear(), friendBirthdayMonth, friendBirthdayDay);
        birthday.setHours(0, 0, 0, 0); // Set birthday time to midnight

        const diffInMs = birthday.getTime() - today.getTime();
        const daysLeft = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        // Calculate remaining hours if it's the same day after birthday
        const hoursLeft = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((diffInMs % (1000 * 60)) / 1000);

        const formattedHoursLeft = hoursLeft.toString().padStart(2, '0');
        const formattedMinutesLeft = minutesLeft.toString().padStart(2, '0');
        const formattedSecondsLeft = secondsLeft.toString().padStart(2, '0');

        messageDiv.textContent = `There are ${daysLeft} days, ${formattedHoursLeft} hours, ${formattedMinutesLeft} minutes, and ${formattedSecondsLeft} seconds left until ${friendName}'s birthday.⌚`;
      } else {
        // Birthday has already passed this year
        const nextYear = today.getFullYear() + 1;
        const birthday = new Date(nextYear, friendBirthdayMonth, friendBirthdayDay);
        const diffInMs = birthday.getTime() - today.getTime();
        const daysLeft = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        messageDiv.textContent = `There are ${daysLeft} days left until ${friendName}'s birthday next year.⏳`;
      }
    }
  } else {
    messageDiv.textContent = ''; // Clear any previous message
    messageDiv.style.backgroundImage = `url(${noSelectionImagePath})`; // Set no selection background image
    // messageDiv.style.backgroundRepeat = 'no-repeat';
    messageDiv.style.backgroundSize = 'content';
  }
});

// else if (isNextYearBirthday) {
//   // Birthday in next year
//   const nextYear = today.getFullYear() + 1;
//   const birthday = new Date(nextYear, friendBirthdayMonth, friendBirthdayDay);
//   const diffInMs = birthday.getTime() - today.getTime();
//   const daysLeft = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

//   messageDiv.textContent = `There are ${daysLeft} days left until ${friendName}'s birthday next year.⏳`;
//   messageDiv.style.backgroundImage = `url(${defaultImagePath})`; // Set default background image 
//   // messageDiv.style.backgroundRepeat = "no-repeat";
//   messageDiv.style.backgroundSize = 'content';
// }
