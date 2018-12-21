const skills = [
  {
    prefix:"alexa blink",
    procedure:(fullCommand)=>{
      const blind = document.querySelector("#blind");
      blind.style.display = "block";
      setTimeout(()=>{
        blind.style.display = "none"
      }, 200);
    }
  }
]

function matchSkill(command){
  return skills.find( skill => command.startsWith(skill.prefix) );
}

async function execute(command) {
  matchSkill(command).procedure(command);
}

