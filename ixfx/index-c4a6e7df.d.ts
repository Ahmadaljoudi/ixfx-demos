import { e as easeOverTime, a as easeOverTicks, E as Easing, b as EasingName, g as get, c as getEasings, f as functions } from './Easing-1236cfc7';
import { S as SimpleEventEmitter } from './Events-53171926';
import { a as Timer } from './Timer-ec0a330f';

/**
 * @returns Returns a full set of default ADSR options
 */
declare const defaultAdsrOpts: () => EnvelopeOpts;
declare type EnvelopeOpts = AdsrOpts & AdsrTimingOpts;
/**
 * Options for the ADSR envelope.
 *
 * Use {@link defaultAdsrOpts} to get an initial default:
 * @example
 * ```js
 * let env = adsr({
 *  ...defaultAdsrOpts(),
 *  attackDuration: 2000,
 *  releaseDuration: 5000,
 *  sustainLevel: 1,
 *  retrigger: false
 * });
 * ```
 */
declare type AdsrOpts = {
    /**
     * Attack bezier 'bend'. Bend from -1 to 1. 0 for a straight line
     */
    readonly attackBend: number;
    /**
     * Decay bezier 'bend'. Bend from -1 to 1. 0 for a straight line
     */
    readonly decayBend: number;
    /**
     * Release bezier 'bend'. Bend from -1 to 1. 0 for a straight line
     */
    readonly releaseBend: number;
    /**
     * Peak level (maximum of attack stage)
     */
    readonly peakLevel: number;
    /**
     * Starting level (usually 0)
     */
    readonly initialLevel?: number;
    /**
     * Sustain level. Only valid if trigger and hold happens
     */
    readonly sustainLevel: number;
    /**
     * Release level, when envelope is done (usually 0)
     */
    readonly releaseLevel?: number;
    /**
     * When _false_, envelope starts from it's current level when being triggered.
     * _True_ by default.
     */
    readonly retrigger?: boolean;
};
declare type AdsrTimingOpts = {
    /**
     * If true, envelope indefinately returns to attack stage after release
     *
     * @type {boolean}
     */
    readonly shouldLoop: boolean;
    /**
     * Duration for attack stage
     * Unit depends on timer source
     * @type {number}
     */
    readonly attackDuration: number;
    /**
     * Duration for decay stage
     * Unit depends on timer source
     * @type {number}
     */
    readonly decayDuration: number;
    /**
     * Duration for release stage
     * Unit depends on timer source
     * @type {number}
     */
    readonly releaseDuration: number;
};
/**
 * @private
 */
interface StateChangeEvent {
    readonly newState: string;
    readonly priorState: string;
}
/**
 * @private
 */
interface CompleteEvent {
}
declare type Events = {
    readonly change: StateChangeEvent;
    readonly complete: CompleteEvent;
};
/**
 * ADSR (Attack Decay Sustain Release) envelope. An envelope is a value that changes over time,
 * usually in response to an intial trigger.
 *
 * Created with the {@link adsr} function.
 *
 * @example Setup
 * ```js
 * const opts = {
 *  ...defaultAdsrOpts(),
 *  attackDuration: 1000,
 *  decayDuration: 200,
 *  sustainDuration: 100
 * }
 * const env = adsr(opts);
 * ```
 *
 * @example Using
 * ```js
 * env.trigger(); // Start envelop
 * ...
 * // Get current value of envelope
 * const [state, scaled, raw] = env.compute();
 * ```
 *
 * * `state` is string: `attack`, `decay`, `sustain`, `release`, `complete
 * * `scaled` is a value scaled according to stage _levels_
 * * `raw` is the progress from 0 to 1 within a stage
 *
 * ...normally you'd just want:
 * ```js
 * const value = env.value; // Get scaled
 * ```
 *
 * @example Hold & release
 * ```js
 * env.trigger(true); // Pass in true to hold
 * ...envelope will stop at sustain stage...
 * env.relese();      // Release into decay
 * ```
 *
 * Check if it's done:
 * ```js
 * env.isDone; // True if envelope is completed
 * ```
 *
 * Envelope has events to track activity: `change` and `complete`:
 *
 * ```
 * env.addEventListener(`change`, ev => {
 *  console.log(`Old: ${evt.oldState} new: ${ev.newState}`);
 * })
 * ```
 */
interface Adsr extends SimpleEventEmitter<Events> {
    /**
     * Compute value of envelope at this point in time.
     *
     * Returns an array of [stage, scaled, raw]. Most likely you want to use {@link value} to just get the scaled value.
     * @param allowStateChange If true (default) envelope will be allowed to change state if necessary before returning value
     */
    compute(allowStateChange?: boolean): readonly [stage: string | undefined, scaled: number, raw: number];
    /**
     * Returns the scaled value
     * Same as .compute()[1]
     */
    get value(): number;
    /**
     * Releases a held envelope. Has no effect if envelope was not held or is complete.
     */
    release(): void;
    /**
     * Triggers envelope.
     *
     * If event is already trigged,
     * it will be _retriggered_. If`opts.retriggered` is false (default)
     * envelope starts again at `opts.initialValue`. Otherwise it starts at
     * the current value.
     *
     * @param hold If _true_ envelope will hold at sustain stage
     */
    trigger(hold?: boolean): void;
    /**
     * _True_ if envelope is completed
     */
    get isDone(): boolean;
}
/**
 * @inheritdoc Adsr
 * @param opts
 * @returns New {@link Adsr} Envelope
 */
declare const adsr: (opts: EnvelopeOpts) => Adsr;

/**
 * Sine oscillator.
 *
 * ```js
 * const osc = sine(Timers.frequencyTimer(10));
 * const osc = sine(0.1);
 * osc.next().value;
 * ```
 *
 * // Saw/tri pinch
 * ```js
 * const v = Math.pow(osc.value, 2);
 * ```
 *
 * // Saw/tri bulge
 * ```js
 * const v = Math.pow(osc.value, 0.5);
 * ```
 *
 */
declare function sine(timerOrFreq: Timer | number): Generator<number, void, unknown>;
/**
 * Bipolar sine (-1 to 1)
 * @param timerOrFreq
 */
declare function sineBipolar(timerOrFreq: Timer | number): Generator<number, void, unknown>;
/**
 * Triangle oscillator
 * ```js
 * const osc = triangle(Timers.frequencyTimer(0.1));
 * const osc = triangle(0.1);
 * osc.next().value;
 * ```
 */
declare function triangle(timerOrFreq: Timer | number): Generator<number, void, unknown>;
/**
 * Saw oscillator
 * ```js
 * const osc = saw(Timers.frequencyTimer(0.1));
 * const osc = saw(0.1);
 * osc.next().value;
 * ```
 */
declare function saw(timerOrFreq: Timer): Generator<number, void, unknown>;
/**
 * Square oscillator
 * ```js
 * const osc = square(Timers.frequencyTimer(0.1));
 * const osc = square(0.1);
 * osc.next().value;
 * ```
 */
declare function square(timerOrFreq: Timer): Generator<0 | 1, void, unknown>;

declare const Oscillator_sine: typeof sine;
declare const Oscillator_sineBipolar: typeof sineBipolar;
declare const Oscillator_triangle: typeof triangle;
declare const Oscillator_saw: typeof saw;
declare const Oscillator_square: typeof square;
declare namespace Oscillator {
  export {
    Oscillator_sine as sine,
    Oscillator_sineBipolar as sineBipolar,
    Oscillator_triangle as triangle,
    Oscillator_saw as saw,
    Oscillator_square as square,
  };
}

declare const index_easeOverTime: typeof easeOverTime;
declare const index_easeOverTicks: typeof easeOverTicks;
declare const index_Easing: typeof Easing;
declare const index_EasingName: typeof EasingName;
declare const index_get: typeof get;
declare const index_getEasings: typeof getEasings;
declare const index_functions: typeof functions;
declare const index_defaultAdsrOpts: typeof defaultAdsrOpts;
type index_EnvelopeOpts = EnvelopeOpts;
type index_AdsrOpts = AdsrOpts;
type index_AdsrTimingOpts = AdsrTimingOpts;
type index_StateChangeEvent = StateChangeEvent;
type index_CompleteEvent = CompleteEvent;
type index_Adsr = Adsr;
declare const index_adsr: typeof adsr;
declare namespace index {
  export {
    Oscillator as Oscillators,
    index_easeOverTime as easeOverTime,
    index_easeOverTicks as easeOverTicks,
    index_Easing as Easing,
    index_EasingName as EasingName,
    index_get as get,
    index_getEasings as getEasings,
    index_functions as functions,
    index_defaultAdsrOpts as defaultAdsrOpts,
    index_EnvelopeOpts as EnvelopeOpts,
    index_AdsrOpts as AdsrOpts,
    index_AdsrTimingOpts as AdsrTimingOpts,
    index_StateChangeEvent as StateChangeEvent,
    index_CompleteEvent as CompleteEvent,
    index_Adsr as Adsr,
    index_adsr as adsr,
  };
}

export { AdsrOpts as A, CompleteEvent as C, EnvelopeOpts as E, Oscillator as O, StateChangeEvent as S, AdsrTimingOpts as a, Adsr as b, adsr as c, defaultAdsrOpts as d, index as i };