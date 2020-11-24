import React from "react";
import "./Footer.scss";

/**
 * Renders site footer
 *
 * @class Footer
 * @extends {React.Component}
 */
class Footer extends React.Component {
	/**
	 * Creates an instance of Footer.
	 * @param {object} props
	 * @memberof Footer
	 */
	constructor(props) {
		super(props);
		this.state = {
			year: new Date().getFullYear(),
		};
	}

	/**
	 * React lifecycle method.
	 *
	 * @returns {object}
	 * @memberof Footer
	 */
	render() {
		return (
			<div className="FooterContainer">
				<div className="container">
					<div className="wptah-section clearfix">
						<p>Copyright {this.state.year} Brian Hagan</p>
						<p>
							Licensed under <a href="https://en.wikipedia.org/wiki/MIT_License">MIT License</a>
						</p>

						<p>
							<small>
								Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is
								hereby granted, provided that the above copyright notice and this permission notice appear in all
								copies.
							</small>
						</p>
						<p>
							<small>
								THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
								INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE
								FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
								LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
								ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
							</small>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
