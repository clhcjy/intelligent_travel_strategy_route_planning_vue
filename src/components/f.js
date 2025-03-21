const CustomMenu = styled(Menu)`
  width: 100%;
  height: 550px;
  border-radius: 5px;
  background-color: rgb(239, 240, 241) !important;
    padding-left: px;
    .ant-menu-item::before {
        background-color: transparent !important; /* 去掉高亮背景 */
        border: none !important; /* 去掉边框 */
        content: none !important; /* 去掉伪元素内容 */
      }
`;
const handleMenuClick = (item, key) => {
  console.log(item, key);
  setSelectedKey(item.key);
  update("key", item.key);
  execute("click2");
};
{{今日工作.chancelist()}}

const [selectedKey, setSelectedKey] = React.useState(
  props.data?.obj?.key || "1"
); // 保存当前选中的菜单项

const style8 = {color:"#026EFF"};
const style9 = {color:"#000000"};

const items = [
  {
    key: "1",
    // label: `今日预约\u00A0\u00A0\u00A0\u00A0(${props.data?.obj?.data?.[0]?.total ?? ''})`,
    label: (selected) => (
        <span style={selected?style8:style9}>
          今日预约&nbsp;&nbsp;&nbsp;&nbsp;({props.data?.obj?.data?.[0]?.total ?? ''})
        </span>
      ),
    icon: (selected) => (
      <svg
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <g id="Group_2">
            <g id="Group_3">
              <path
                id="Vector"
                d="M4.95047 11.88H2.52048C1.53048 11.88 0.730469 11.08 0.730469 10.09V2.03999C0.730469 1.04999 1.53048 0.25 2.52048 0.25H8.80048C9.79048 0.25 10.5905 1.04999 10.5905 2.03999V6.53"
                stroke={selected ? "#026EFF" : "#808080"}
                stroke-width="0.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
            </g>
            <path
              id="Vector_2"
              d="M2.30078 2.56006H8.95078"
              stroke={selected ? "#026EFF" : "#808080"}
              stroke-width="0.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              id="Vector_3"
              d="M2.30078 4.8999H8.95078"
              stroke={selected ? "#026EFF" : "#808080"}
              stroke-width="0.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <path
              id="Vector_4"
              d="M2.30078 7.23999H5.64078"
              stroke={selected ? "#026EFF" : "#808080"}
              stroke-width="0.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
            />
            <g id="Group_4">
              <path
                id="Vector_5"
                d="M8.78027 9.51001C9.47063 9.51001 10.0303 8.95037 10.0303 8.26001C10.0303 7.56965 9.47063 7.01001 8.78027 7.01001C8.08992 7.01001 7.53027 7.56965 7.53027 8.26001C7.53027 8.95037 8.08992 9.51001 8.78027 9.51001Z"
                stroke={selected ? "#026EFF" : "#808080"}
                stroke-width="0.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
            </g>
            <g id="Group_5">
              <path
                id="Vector_6"
                d="M11.6605 11.88C11.6605 10.69 10.3905 9.71997 8.82048 9.71997C7.25048 9.71997 5.98047 10.69 5.98047 11.88"
                stroke={selected ? "#026EFF" : "#808080"}
                stroke-width="0.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
              />
            </g>
          </g>
        </g>
      </svg>
    ),
  },
  {
    key: "2",
    // label: `今日挂号\u00A0\u00A0\u00A0\u00A0(${props.data?.obj?.data?.[1]?.total ?? ''})`,
    label: (selected) => (
        <span style={selected?style8:style9}>
          今日挂号&nbsp;&nbsp;&nbsp;&nbsp;({props.data?.obj?.data?.[1]?.total ?? ''})
        </span>
      ),
    icon: (selected) => (
      <svg
        width="12"
        height="13"
        viewBox="0 0 12 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <g id="Group_2">
            <path
              id="Vector"
              d="M9.62047 10.4099H2.77048C1.78048 10.4099 0.980469 9.60992 0.980469 8.61992V2.20993C0.980469 1.21993 1.78048 0.419922 2.77048 0.419922H9.62047C10.6105 0.419922 11.4105 1.21993 11.4105 2.20993V8.61992C11.4105 9.59992 10.6105 10.4099 9.62047 10.4099Z"
              stroke={selected ? "#026EFF" : "#808080"}
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <g id="Group_3">
              <path
                id="Vector_2"
                d="M4.15039 5.3999L8.23039 5.40991"
                stroke={selected ? "#026EFF" : "#808080"}
                stroke-width="0.5"
                stroke-miterlimit="10"
              />
              <path
                id="Vector_3"
                d="M6.19043 7.44987L6.20042 3.36987"
                stroke={selected ? "#026EFF" : "#808080"}
                stroke-width="0.5"
                stroke-miterlimit="10"
              />
            </g>
          </g>
        </g>
      </svg>
    ),
  },
  {
    key: "3",
    // label: `今日收费\u00A0\u00A0\u00A0\u00A0(${props.data?.obj?.data?.[2]?.total ?? ''})`,
    label: (selected) => (
        <span style={selected?style8:style9}>
          今日收费&nbsp;&nbsp;&nbsp;&nbsp;({props.data?.obj?.data?.[2]?.total ?? ''})
        </span>
      ),
    icon: (selected) => (
      <svg
        width="12"
        height="13"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <path
            id="Vector"
            d="M6.40973 11.1201H5.96973C3.20973 11.1201 0.969727 8.88012 0.969727 6.12012C0.969727 3.36012 3.20973 1.12012 5.96973 1.12012H6.40973C9.16973 1.12012 11.4097 3.36012 11.4097 6.12012C11.4097 8.88012 9.16973 11.1201 6.40973 11.1201Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <g id="Group_2">
            <path
              id="Vector_2"
              d="M4.34961 7.33032L8.0296 7.34032"
              stroke={selected ? "#026EFF" : "#808080"}
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <path
              id="Vector_3"
              d="M4.34961 5.22021L8.0296 5.23021"
              stroke={selected ? "#026EFF" : "#808080"}
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
            <g id="Group_3">
              <path
                id="Vector_4"
                d="M4.58008 3.99023L5.80008 5.14023"
                stroke={selected ? "#026EFF" : "#808080"}
                stroke-width="0.5"
                stroke-miterlimit="10"
              />
              <path
                id="Vector_5"
                d="M7.79985 3.99023L6.58984 5.14023"
                stroke={selected ? "#026EFF" : "#808080"}
                stroke-width="0.5"
                stroke-miterlimit="10"
              />
            </g>
            <path
              id="Vector_6"
              d="M6.18945 8.66013V5.37012"
              stroke={selected ? "#026EFF" : "#808080"}
              stroke-width="0.5"
              stroke-miterlimit="10"
            />
          </g>
        </g>
      </svg>
    ),
  },
  {
    key: "12",
    // label: `今日看诊\u00A0\u00A0\u00A0\u00A0(${props.data?.obj?.data?.[3]?.total ?? ''})`,
    label: (selected) => (
        <span style={selected?style8:style9}>
          今日看诊&nbsp;&nbsp;&nbsp;&nbsp;({props.data?.obj?.data?.[3]?.total ?? ''})
        </span>
      ),
    icon: (selected) => (
      <svg
        width="12"
        height="13"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <path
            id="Vector"
            d="M7.00945 2.87997H7.27945V2.54996H7.61945V2.28998H7.27945V1.95996H7.00945V2.28998H6.68945V2.54996H7.00945V2.87997Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_2"
            d="M9.86969 4.63995V1.83993C9.86969 1.83993 7.14969 -0.280073 4.42969 1.83993V4.63995C4.42969 4.63995 5.29969 3.76992 7.11969 3.73992C8.93969 3.70992 9.86969 4.63995 9.86969 4.63995ZM6.14969 2.15993C6.14969 1.83993 6.40969 1.57992 6.72969 1.57992C6.89969 1.57992 7.0597 1.65993 7.1597 1.77993C7.2697 1.65993 7.41969 1.57992 7.58969 1.57992C7.90969 1.57992 8.16969 1.83993 8.16969 2.15993C8.16969 2.33993 8.0897 2.48994 7.9697 2.59994L7.17969 3.37994L6.3597 2.59994C6.2197 2.48994 6.14969 2.33993 6.14969 2.15993Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_3"
            d="M4.31934 5.72997C4.31934 7.33997 5.53932 9.33996 7.14932 9.33996C8.07932 9.33996 8.83933 8.66995 9.30933 7.92995C9.55933 7.53995 9.73933 7.10997 9.85933 6.65997C9.91933 6.42997 9.95933 6.19996 9.96933 5.96996C9.97933 5.78996 9.94933 5.59995 9.88933 5.42995C9.82933 5.25995 9.72933 5.14996 9.59933 5.02996C9.05933 4.53996 8.39932 4.31995 7.67932 4.26995C6.89932 4.20995 6.08933 4.28997 5.37933 4.62997C5.10933 4.75997 4.85932 4.90995 4.61932 5.10995C4.44932 5.23995 4.31934 5.47997 4.31934 5.72997Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_4"
            d="M9.87952 8.33987L7.45952 12.4799C7.28952 12.7799 6.84951 12.7699 6.68951 12.4599L4.52951 8.35986C4.42951 8.17986 4.22951 8.07989 4.02951 8.13989C3.31951 8.33989 1.74951 9.08988 1.21951 11.7199C1.09951 12.3299 1.36951 13.2699 1.91951 13.5699C2.73951 14.0199 4.29952 14.5099 7.20952 14.4799C9.58952 14.4999 11.0695 14.1799 11.9795 13.8099C12.8795 13.4499 13.3795 12.4599 13.1595 11.5099C12.5895 9.01988 11.0495 8.31988 10.3695 8.12988C10.1795 8.07988 9.97952 8.15987 9.87952 8.33987Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
        </g>
      </svg>
    ),
  },
  {
    key: "4",
    // label: `今日检查\u00A0\u00A0\u00A0\u00A0(${props.data?.obj?.data?.[4]?.total ?? ''})`,
    label: (selected) => (
        <span style={selected?style8:style9}>
         今日检查&nbsp;&nbsp;&nbsp;&nbsp;({props.data?.obj?.data?.[4]?.total ?? ''})
        </span>
      ),
    icon: (selected) => (
      <svg
        width="12"
        height="13"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <path
            id="Vector"
            d="M3.11995 2.42987C3.62253 2.42987 4.02995 2.02245 4.02995 1.51987C4.02995 1.01729 3.62253 0.609863 3.11995 0.609863C2.61737 0.609863 2.20996 1.01729 2.20996 1.51987C2.20996 2.02245 2.61737 2.42987 3.11995 2.42987Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_2"
            d="M6.72055 2.42987C7.22313 2.42987 7.63055 2.02245 7.63055 1.51987C7.63055 1.01729 7.22313 0.609863 6.72055 0.609863C6.21797 0.609863 5.81055 1.01729 5.81055 1.51987C5.81055 2.02245 6.21797 2.42987 6.72055 2.42987Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_3"
            d="M2.51033 1.56979C2.51033 1.56979 1.02033 1.73979 0.830333 3.24979C0.650333 4.66979 1.12032 6.08978 1.90032 7.26978C2.57032 8.26978 3.52034 9.48979 4.85034 9.53979C5.95034 9.57979 6.80034 8.77978 7.38034 7.92978C7.92034 7.12978 8.31033 6.21977 8.59033 5.29977C8.83033 4.49977 9.11032 3.5498 8.79032 2.7298C8.49032 1.9498 7.73032 1.58979 6.93032 1.52979"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_4"
            d="M4.86072 9.52988C4.67072 10.3099 4.68072 11.1999 5.07072 11.9299C5.65072 13.0099 7.04071 13.2999 8.17071 13.0999C8.90071 12.9699 9.62072 12.4899 9.94072 11.8099C10.2807 11.0999 9.91072 10.3199 9.74072 9.60986C9.55072 8.81986 9.44072 7.97989 9.61072 7.16989C9.74072 6.55989 10.0907 6.02987 10.7207 5.86987"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_5"
            d="M12.2206 6.86987C12.9772 6.86987 13.5906 6.25651 13.5906 5.49988C13.5906 4.74325 12.9772 4.12988 12.2206 4.12988C11.464 4.12988 10.8506 4.74325 10.8506 5.49988C10.8506 6.25651 11.464 6.86987 12.2206 6.86987Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_6"
            d="M12.2103 6.19C12.5858 6.19 12.8903 5.86765 12.8903 5.47C12.8903 5.07236 12.5858 4.75 12.2103 4.75C11.8347 4.75 11.5303 5.07236 11.5303 5.47C11.5303 5.86765 11.8347 6.19 12.2103 6.19Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
        </g>
      </svg>
    ),
  },
  {
    key: "6",
    // label: `今日干眼\u00A0\u00A0\u00A0\u00A0(${props.data?.obj?.data?.[5]?.total ?? ''})`,
    label: (selected) => (
        <span style={selected?style8:style9}>
         今日干眼&nbsp;&nbsp;&nbsp;&nbsp;({props.data?.obj?.data?.[5]?.total ?? ''})
        </span>
      ),
    icon: (selected) => (
      <svg
        width="12"
        height="13"
        viewBox="0 0 18 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <path
            id="Vector"
            d="M12.0003 6.31003C12.8203 6.54003 13.6203 6.86002 14.3603 7.27002C15.4703 7.90002 16.5803 8.76004 17.3003 9.82004C18.2603 11.25 15.2703 12.74 14.3603 13.23C10.2803 15.46 4.28028 14.79 1.25028 11.01C1.05028 10.76 0.840284 10.47 0.890284 10.17C0.900284 10.1 0.93028 10.03 0.98028 9.96002C2.24028 8.08002 4.12029 6.86003 6.21029 6.28003"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_2"
            d="M11.7801 6.94989C12.7401 7.72989 13.3501 8.91988 13.3501 10.2499C13.3501 12.5999 11.4401 14.5099 9.09007 14.5099C6.74007 14.5099 4.83008 12.5999 4.83008 10.2499C4.83008 8.86988 5.49007 7.63986 6.51007 6.85986"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_3"
            d="M10.5903 8.3999C11.1503 8.8299 11.5203 9.50991 11.5203 10.2799C11.5203 11.5899 10.4603 12.6499 9.15027 12.6499C7.84027 12.6499 6.78027 11.5899 6.78027 10.2799C6.78027 10.0299 6.82027 9.78991 6.89027 9.55991C6.90027 9.53991 6.92028 9.4899 6.94028 9.4899C6.96028 9.4899 6.97028 9.49992 6.99028 9.50992C7.12028 9.56992 7.27027 9.59991 7.42027 9.59991C7.93027 9.59991 8.35027 9.23992 8.45027 8.75992C8.46027 8.68992 8.47028 8.6199 8.47028 8.5499"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_4"
            d="M8.96057 0.54992C8.86057 0.71992 8.73056 0.879931 8.63056 1.02993C8.31056 1.50993 8.01055 1.99993 7.68055 2.46993C7.07055 3.35993 6.42055 4.30994 6.29055 5.40994C6.23055 5.91994 6.30056 6.42993 6.48056 6.89993C6.83056 7.77993 7.93056 8.69994 8.89056 8.75994C9.57056 8.79994 10.3106 8.56995 10.8606 8.16995C11.3706 7.79995 11.7106 7.25995 11.9006 6.66995C12.1706 5.80995 12.0506 5.10994 11.7306 4.28994C11.4006 3.43994 10.8506 2.72994 10.3606 1.97994C10.0606 1.51994 9.73057 1.03994 9.46057 0.539941C9.34057 0.279941 9.12057 0.29992 8.96057 0.54992Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
        </g>
      </svg>
    ),
  },
  {
    key: "5",
    // label: `今日视训\u00A0\u00A0\u00A0\u00A0(${props.data?.obj?.data?.[6]?.total ?? ''})`,
    label: (selected) => (
        <span style={selected?style8:style9}>
         今日视训&nbsp;&nbsp;&nbsp;&nbsp;({props.data?.obj?.data?.[6]?.total ?? ''})
        </span>
      ),
    icon: (selected) => (
      <svg
        width="12"
        height="13"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <path
            id="Vector"
            d="M3.37042 12.2599C2.03042 11.0099 1.19043 9.22995 1.19043 7.25995C1.19043 3.48995 4.25043 0.429932 8.02043 0.429932C9.85043 0.429932 11.5104 1.14995 12.7404 2.31995"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_2"
            d="M13.3603 2.97998C14.3003 4.14998 14.8703 5.63998 14.8703 7.25998C14.8703 11.03 11.8103 14.09 8.03035 14.09C6.46035 14.09 5.02035 13.56 3.86035 12.67"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_3"
            d="M11.4307 2.16003L12.6507 2.41003C12.7407 2.43003 12.8207 2.34003 12.7907 2.25003L12.4007 1.03003"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_4"
            d="M3.8309 6.60982C3.5009 6.97982 3.36089 7.40984 3.76089 7.87984C3.76089 7.87984 5.43089 9.86983 8.12089 9.73983C8.12089 9.73983 11.0909 9.69985 12.3809 7.50985C12.3809 7.50985 12.5109 7.14983 12.2209 6.83983C11.9109 6.50983 11.6209 6.20983 11.2709 5.95983C10.5109 5.40983 9.63089 5.04983 8.70089 4.89983C7.76089 4.75983 6.80089 4.88983 5.93089 5.23983C5.17089 5.54983 4.3809 5.98982 3.8309 6.60982Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_5"
            d="M8.59007 7.26987C8.59007 7.61987 8.31008 7.89987 7.96008 7.89987C7.61008 7.89987 7.33008 7.61987 7.33008 7.26987C7.33008 6.91987 7.61008 6.63989 7.96008 6.63989"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_6"
            d="M7.96043 8.79001C8.79991 8.79001 9.48042 8.10946 9.48042 7.26999C9.48042 6.43052 8.79991 5.75 7.96043 5.75C7.12096 5.75 6.44043 6.43052 6.44043 7.26999C6.44043 8.10946 7.12096 8.79001 7.96043 8.79001Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_7"
            d="M6.27058 10.3101L5.85059 10.9901"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_8"
            d="M7.93066 10.48L7.95067 11.77"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_9"
            d="M9.68066 10.3699L10.0107 10.9199"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_10"
            d="M6.2804 4.33994L5.90039 3.68994"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_11"
            d="M9.61035 4.28992L10.0504 3.65991"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_12"
            d="M7.9502 4.10004L7.9702 2.79004"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
        </g>
      </svg>
    ),
  },
  {
    key: "7",
    // label: `今日随访\u00A0\u00A0\u00A0\u00A0(${props.data?.obj?.data?.[7]?.total ?? ''})`,
    label: (selected) => (
        <span style={selected?style8:style9}>
         今日随访&nbsp;&nbsp;&nbsp;&nbsp;({props.data?.obj?.data?.[7]?.total ?? ''})
        </span>
      ),
    icon: (selected) => (
      <svg
        width="12"
        height="13"
        viewBox="0 0 15 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <path
            id="Vector"
            d="M7.86058 5.4299C9.24682 5.4299 10.3706 4.30616 10.3706 2.91992C10.3706 1.53369 9.24682 0.409912 7.86058 0.409912C6.47435 0.409912 5.35059 1.53369 5.35059 2.91992C5.35059 4.30616 6.47435 5.4299 7.86058 5.4299Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_2"
            d="M3.18035 15.2399H2.09036C0.560355 14.9299 0.900353 13.5499 0.900353 13.5499L2.80036 7.47991C3.06036 6.6799 3.79035 6.5999 3.79035 6.5999L5.28036 6.30989C5.41036 6.27989 5.55035 6.33989 5.62035 6.45989L7.57037 9.64989C7.69037 9.83989 7.96036 9.8399 8.08036 9.6599L10.1404 6.48988C10.2204 6.36988 10.3604 6.30989 10.5004 6.33989L11.7304 6.60988C11.7304 6.60988 12.4904 6.79989 12.7204 7.49989L14.5904 13.5699C14.5904 13.5699 14.9704 14.9999 13.7304 15.2899H12.4004"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_3"
            d="M8.87007 16.5999H6.58008C5.20008 16.5999 4.08008 15.4799 4.08008 14.0999C4.08008 12.7199 5.20008 11.5999 6.58008 11.5999H8.87007C10.2501 11.5999 11.3701 12.7199 11.3701 14.0999C11.3701 15.4799 10.2501 16.5999 8.87007 16.5999Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
        </g>
      </svg>
    ),
  },
  {
    key: "11",
    // label: `今日审批\u00A0\u00A0\u00A0\u00A0(${props.data?.obj?.data?.[8]?.total ?? ''})`,
    label: (selected) => (
        <span style={selected?style8:style9}>
         今日审批&nbsp;&nbsp;&nbsp;&nbsp;({props.data?.obj?.data?.[8]?.total ?? ''})
        </span>
      ),
    icon: (selected) => (
      <svg
        width="12"
        height="13"
        viewBox="0 0 17 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group">
          <path
            id="Vector"
            d="M13.0896 11.3899H4.40958C2.55958 11.3899 1.05957 9.88986 1.05957 8.03986V3.97986C1.05957 2.12986 2.55958 0.629883 4.40958 0.629883H13.0896C14.9396 0.629883 16.4396 2.12986 16.4396 3.97986V8.03986C16.4396 9.88986 14.9396 11.3899 13.0896 11.3899Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_2"
            d="M3.88965 4.46991L4.76965 5.44995C4.83965 5.52995 4.96964 5.52994 5.03964 5.43994L7.12965 2.92993"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_3"
            d="M5.32993 9.30988H5.24992C4.64992 9.30988 4.16992 8.82986 4.16992 8.22986C4.16992 7.62986 4.64992 7.1499 5.24992 7.1499H5.32993C5.92993 7.1499 6.40993 7.62986 6.40993 8.22986C6.40993 8.82986 5.91993 9.30988 5.32993 9.30988Z"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_4"
            d="M6.51953 11.4697V13.9197"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_5"
            d="M10.7793 11.4697V13.9197"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_6"
            d="M4.26953 14.0098H12.8795"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_7"
            d="M7.55957 4.80981H13.4496"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
          <path
            id="Vector_8"
            d="M7.55957 8.36987H13.4496"
            stroke={selected ? "#026EFF" : "#808080"}
            stroke-width="0.5"
            stroke-miterlimit="10"
          />
        </g>
      </svg>
    ),
  },
  {
    key: "13",
    // label: `今日新增\u00A0\u00A0\u00A0\u00A0(${props.data?.obj?.data?.[9]?.total ?? ''})`,
    label: (selected) => (
        <span style={selected?style8:style9}>
         今日新增&nbsp;&nbsp;&nbsp;&nbsp;({props.data?.obj?.data?.[9]?.total ?? ''})
        </span>
      ),
    icon: (selected) => (
      <svg t="1741069898307" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1591" id="mx_n_1741069898307" width="12" height="13"><path d="M722.995 541.05c83.58-43.31 140.734-130.544 140.734-231.177 0-143.755-116.537-260.28-260.28-260.28-143.75 0-260.286 116.53-260.286 260.28 0 99.425 55.772 185.8 137.718 229.632-174.065 52.06-303.135 214.753-298.814 399.728 0 36.46 49.29 31.447 49.29 1.808 0-204.831 166.052-370.883 370.888-370.883 204.83 0 370.883 166.057 370.883 370.883 0 24.852 43.269 21.1 43.269-1.808 4.08-183.219-122.122-344.448-293.402-398.182zM599.24 522.06c-5.028 0-10.015 0.206-15.007 0.39-108.754-9.15-194.181-100.26-194.181-211.38 0-117.191 95.001-212.187 212.193-212.187 117.192 0 217.487 95.001 217.487 212.188 0 111.641-91.033 203.08-200.975 211.497a411.674 411.674 0 0 0-19.517-0.507zM336.43 552.05c0.338 0 0.67 0.025 1.004 0.025 30.56 0 31.221-49.643-1.004-49.643-0.824 0-1.638-0.046-2.463-0.057l-0.046-0.937c-4.29 0-8.53 0.18-12.764 0.343-91.105-7.214-167.004-78.284-167.004-170.741 0-97.587 84.536-176.691 182.277-176.691 32.277 0 23.772-41.048-9.595-41.048-119.9 0-217.093 97.04-217.093 216.735 0 79.55 47.631 151.383 114.76 190.659C91.397 569.42 3.676 704.722 7.168 854.103c0 30.372 46.403 26.189 46.403 1.505 0-170.562 112.015-303.534 282.86-303.534v-0.025z" fill={selected ? "#026EFF" : "#808080"} p-id="1592"></path></svg>
    ),
  },
];

const menuStlye = {
  backgroundColor: "#cccccc",
};

return (
  <CustomMenu
    defaultSelectedKeys={[props.data?.obj?.key ]}
    mode="inline"
    theme="light"
    items={items.map((item) => ({
      ...item,
      icon: item?.icon(selectedKey === item.key), // 动态设置选中的图标颜色
      label:item?.label(selectedKey === item.key)
    }))}
    style={menuStlye}
    onClick={handleMenuClick}
  />
);
