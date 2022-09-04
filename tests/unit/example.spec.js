import { shallowMount } from "@vue/test-utils";
import WeatherComponent from "@/components/WeatherComponent.vue";

describe("WeatherComponent.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(WeatherComponent, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
