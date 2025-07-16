import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    width: 100%;
`;

export const BottomContent = styled.View`
    flex: 1;
    gap: 16px;
    background-color: #0000002c;
    padding: 16px;
    border-radius: 38px;
`;

export const BottomButtonsContainer = styled.View`
    position: absolute;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 42px 24px;
    gap: 16px;
`;

export const BottomButtonsContent = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 16px;
`;

export const BottomInfoContent = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    gap: 16px;
`;

export const TopButtonsContainer = styled.View`
    position: absolute;
    flex: 1;
    justify-content: flex-end;
    flex-direction: row;
    right: 0;
    top: 0;
    padding: 64px 24px;
    gap: 16px;
`;

export const PressableButton = styled.TouchableOpacity<{ bgColor?: string }>`
    flex: 1;
    padding: 16px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background-color: ${(props) => props.bgColor || "#000"};
`;

export const PressableButtonIcon = styled.Pressable<{
    bgColor?: string;
    padding?: number;
}>`
    height: 100%;
    padding: ${(props) => props.padding || 16}px;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background-color: ${(props) => props.bgColor || "#000"};
`;

export const ButtonText = styled.Text<{ fontSize?: number; color?: string }>`
    font-size: 16px;
    color: ${(props) => (props.color ? props.color : "#fff")};
    font-weight: 700;
`;

export const ContentDropdown = styled.View`
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    position: absolute;
    top: 100px;
    padding: 16px 24px;
    z-index: 1;
    /* shadow-offset: { width: 0px, height: 2px }; */
`;
export const PressableDropdown = styled.Pressable`
    padding: 10px 14px;
    border-radius: 10px;
    gap: 16px;
    flex-direction: row;
    background-color: #f9f9f9;
    align-self: flex-end;
    elevation: 5;
    shadowcolor: #000;
    shadowopacity: 0.25;
    shadowradius: 3.84px;
`;
export const PressableText = styled.Text<{ fontSize?: number }>`
    font-size: ${(props) => (props.fontSize ? props.fontSize : 16)}px;
    text-align: right;
    color: #000;
    font-weight: 500;
`;

export const RowContainer = styled.View<{ direction?: string, gap?: number }>`
    flex: 1;
    width: 100%;
    justify-content: ${(props) => props.direction || "space-between"};
    flex-direction: row;
    align-items: center;
    gap: ${(props) => (props.gap ? props.gap : 0)}px;
`;

export const InfoContent = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 24px;
    background-color: white;
    padding: 8px 10px;
    border-radius: 16px;
    shadow-color: #000;
    shadow-offset: 0px 1px;
    shadow-opacity: 0.22;
    shadow-radius: 2.22px;
    elevation: 3;
`;

export const FilterButton = styled.Pressable<{bgColor?: string}>`
    flex-direction: row;
    align-items: center;
    gap: 8px;
    background-color: ${(props) => props.bgColor || "#fff"};
    padding: 8px 10px;
    border-radius: 16px;
    shadow-color: #000;
    shadow-offset: 0px 1px;
    shadow-opacity: 0.22;
    shadow-radius: 2.22px;
    elevation: 3;
`;

export const DropdownContainer = styled.View`
    position: absolute;
    bottom: 60px;
    width: 50%;

    right: 0;
    background-color: #fff;
    border-radius: 8px;
    elevation: 5;
    z-index: 1;
`;

