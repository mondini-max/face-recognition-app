export const calculateFaceLocation = async (data) => {
  console.log('this is from function', data);

  const clarifaiAllFaces = await data.outputs[0].data.regions.map((value) => {
    return value.region_info.bounding_box;
  });
  // console.log('All faces', clarifaiAllFaces);
  const targetImage = document.getElementById('targetImage');
  const imageWidth = Number(targetImage.width);
  const imageHeight = Number(targetImage.height);
  // console.log(imageWidth, imageHeight);

  const boxesLocation = await clarifaiAllFaces.map((box) => {
    return {
      leftCol: box.left_col * imageWidth,
      topRow: box.top_row * imageHeight,
      rightCol: imageWidth - box.right_col * imageWidth,
      bottomRow: imageHeight - box.bottom_row * imageHeight,
    };
  });

  return boxesLocation;
};
