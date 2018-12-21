const skills = [
  {
    prefix:"alexa blink",
    procedure:(fullCommand)=>{
      const blind = document.querySelector("#blind");
      blind.style.display = "block";
      setTimeout(1000,()=>blind.style.display = "none");
    }
  }
]

function matchSkill(command){
  return skills.find( skill => command.startsWith(skill.prefix) );
}

async function execute(command) {
  matchSkill(command).procedure(command);
}

