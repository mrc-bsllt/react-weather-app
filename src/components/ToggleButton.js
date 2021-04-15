const ToggleButton = ({ bgProperties, toggleColor }) => {
  const animation = bgProperties.status === "dark" ? "right_to_left bg_green" : "left_to_right bg_lightblue";

  return (
    <div className={ `btn_toggle ${bgProperties.primary_color}` } onClick={ toggleColor }>
      <div className={ `circle ${animation}` }></div>
    </div>
  )
}

export default ToggleButton;
