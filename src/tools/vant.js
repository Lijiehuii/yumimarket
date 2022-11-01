import { Tab, Tabs, ActionSheet, Radio, RadioGroup, AddressList, Popup, Cell, CellGroup, Empty, List, Icon } from 'vant';
import { CountDown, Toast, Uploader, Overlay } from "vant"
import { Field, DatetimePicker, Cascader } from "vant"
import { Button } from 'vant';

const uiArr = [Tab, Tabs, ActionSheet, Radio, RadioGroup,
    AddressList, Popup, Cell, CellGroup, Empty, List, Icon,
    CountDown, Toast, Uploader, Overlay,
    Field, DatetimePicker, Cascader, Button]
const vantUi = {}

vantUi.install = function (Vue) {
    uiArr.forEach(ui => {
        Vue.use(ui)
    })
}

export default vantUi