# Derby Countdown

## Verification status

Assembled, not visually approved. Browser tests could not run because the installed Playwright package has no browser executable. No screenshots are available. Phone readability, overlay registration, interaction, midnight refresh and browser persistence remain unverified. Node checks passed for Sep 1 (287 calendar / 183 school), Sep 15 (273 / 174), Jun 15 (0 / 1), Jun 16 (0 / 0); one and five snow days end Jun 16 and Jun 22; four invalid stored values safely reset. This package is a review build, not an accepted production release.

Open index.html in a browser, or serve this folder with any static web server. Upload its contents unchanged to a GitHub Pages repository. No dependencies or build step. Snow totals are local to this browser and origin; they do not sync between devices. Some browsers restrict storage for local files; use a static server for reliable persistence.

The supplied artwork is preserved, converted losslessly from JPEG pixels to PNG. All changing information is HTML over the image. The full composition scales together; small static labels are necessarily tiny in phone portrait. Rotate for easier reading. Undo and Reset sit below the panels with separate 44px touch targets.

## Calendar source and conventions

Uploaded BOE-approved calendar, revision July 6, 2026, both photographed pages. Official matching revision linked at https://www.derbypride.org/district-calendar/dps-downloadable-calendar (PDF contents could not be independently retrieved online).

First student day September 1, 2026. Tentative final day June 15, 2027. Printed student total 183; staff 186.

Closures: September 7 (Labor Day); October 12 (Columbus Day); November 3 (Election Day), 11 (Veterans Day), 26–27 (Thanksgiving); December 24–January 1 (Winter Break; weekdays Dec 24,25,28,29,30,31 and Jan 1); January 18 (Martin Luther King Day); February 15 (Presidents Day), 16 (February Vacation); March 26 (Good Friday); April 12–16 (Spring Break); May 31 (Memorial Day).

DMS early releases: September 18; October 7; November 9,13,25; December 2,23; February 3,11,12; March 3; April 7; May 5; tentative June 11–15 (weekdays). Students attend these dates. PD early releases: Oct 7, Dec 2, Feb 3, Mar 3, Apr 7, May 5. Preyear staff dates: Aug 26 new-hire orientation, Aug 27 convocation, Aug 28 and 31 professional development. Other-school-only early releases do not change DMS counts.

District note: closings beyond six through March 31 may be made up during April vacation; more than four closings through a quarter can adjust reporting dates. Per user instruction this app ignores April make-ups and adds each snow day after the final day, skipping weekends and listed closures. This is a personal projection, not a live district calendar feed. It does not record actual snow closure dates.

Calendar days exclude today; school days include today if instructional. Both include the final day, with calendar days reaching zero on that date and school days reaching zero the next day. Before school starts school counts begin Sep 1. Next-day-off school counts include today and exclude the closure. During a break both next-break counts show zero and the remaining break dates are shown. No more closures is distinct from school year complete. All date logic uses New York civil dates; UTC arithmetic is used only for date ordinals to avoid DST effects. Values refresh every second and on return to the page.

Only a nonnegative integer snow count is stored. Invalid values reset to zero; a defensive 1000-day ceiling prevents corrupt storage from causing unbounded computation. Storage failure is shown without breaking the counters. Reset requires confirmation.
