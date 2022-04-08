//check collision of objects of the class SPRITE
const checkCollision = (object1, object2) => {
  //check x collision
  if (
    object1.attackBox.position.x + object1.attackBox.width >=
      object2.position.x &&
    object1.attackBox.position.x <= object2.position.x + object2.width
  )
    if (
      object1.attackBox.position.y + object1.attackBox.height >=
        object2.position.y &&
      object1.attackBox.position.y <= object2.position.y + object2.height
    )
      //check y collsiion
      return true;
};

export default checkCollision;
