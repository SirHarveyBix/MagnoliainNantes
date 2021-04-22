const HomeSvg = ({ fill, ...rest }) => {
  return (
    <svg
      width={27}
      height={27}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.75 12.84V27H2.25V12.84L.795 14.296 0 13.5 13.5 0 27 13.5l-.795.795-1.455-1.454zM18 25.876h5.625v-14.16L13.5 1.592 3.375 11.716v14.159H9V15.75h9v10.125zM16.875 17h-6.75v8.75h6.75V17z"
        fill={fill}
      />
    </svg>
  );
};

export default HomeSvg;
