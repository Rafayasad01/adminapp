type Props = {
  color?: string;
};

function ShopIcon({ color }: Props) {
  return (
    <div className="text-base">
      <svg
        width=".9em"
        height=".9em"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Store 1" clipPath="url(#clip0_2860_193)">
          <g id="store-1--store-shop-shops-stores">
            <path
              id="Vector"
              d="M1.71436 9.71436V14.8572C1.71436 15.0088 1.77456 15.1541 1.88173 15.2613C1.98888 15.3684 2.13423 15.4286 2.28578 15.4286H13.7144C13.8659 15.4286 14.0113 15.3684 14.1185 15.2613C14.2256 15.1541 14.2858 15.0088 14.2858 14.8572V9.71436"
              stroke={color || 'white'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_2"
              d="M9.14258 9.71436V15.4286"
              stroke={color || 'white'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_3"
              d="M1.71436 11.4287H9.14293"
              stroke={color || 'white'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_4"
              d="M0.571289 4.57153L2.28557 0.571533H13.7141L15.4284 4.57153H0.571289Z"
              stroke={color || 'white'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_5"
              d="M5.46272 4.57153V5.71439C5.46272 6.3206 5.22191 6.90198 4.79324 7.33063C4.36459 7.75929 3.78321 8.0001 3.177 8.0001H2.857C2.2508 8.0001 1.66941 7.75929 1.24076 7.33063C0.812105 6.90198 0.571289 6.3206 0.571289 5.71439V4.57153"
              stroke={color || 'white'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_6"
              d="M10.5711 4.57153V5.71439C10.5711 6.3206 10.3303 6.90198 9.90161 7.33063C9.47295 7.75929 8.89157 8.0001 8.28537 8.0001H7.71394C7.10773 8.0001 6.52635 7.75929 6.0977 7.33063C5.66903 6.90198 5.42822 6.3206 5.42822 5.71439V4.57153"
              stroke={color || 'white'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_7"
              d="M15.4284 4.57153V5.71439C15.4284 6.3206 15.1876 6.90198 14.7589 7.33063C14.3303 7.75929 13.7489 8.0001 13.1427 8.0001H12.857C12.2508 8.0001 11.6695 7.75929 11.2408 7.33063C10.8121 6.90198 10.5713 6.3206 10.5713 5.71439V4.57153"
              stroke={color || 'white'}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_2860_193">
            <rect width="16" height="16" fill={color || 'white'} />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default ShopIcon;
